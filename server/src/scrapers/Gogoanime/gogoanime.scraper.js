const cheerio = require("cheerio");
const { GOGOANIME: GOGOANIME_URL } = require("../../config/urls");
const { getPage, getAnimePage } = require("../../utils/scraping.util");
const {
  anime: { formatAnimeData, formatEpsSection },
  episodes: { formatAnimeEpsData, formatEpData },
  video: { formatAnimeVideoData, formatVideoSourceData },
  search: { formatSearchData },
  recent: { formatRecentData },
  list: { formatAnimeListData, formatAnimeBrowseData },
  ongoing: { formatOngoingAnime },
  genre: { formatGenreData, formatAnimeGenreData },
} = require("../../utils/formating.util");
const { formatSlug, formatAnimeSlug } = require("../../utils/global.util");

// Get Anime List Data
const getAnimeListData = ($) => {
  const anime = [];
  $("ul.items li").each((i, elem) => {
    const $elem = cheerio.load($(elem).html());
    const image = $elem("img").attr("src");
    const animeSlug = formatAnimeSlug($elem(".img a").attr("href"));
    const title = $elem("p.name").text();
    const subText = $elem(`p.released`).text();
    anime.push(formatAnimeListData(image, animeSlug, title, subText));
  });

  return anime;
};

// Get Total Pages
const getTotalPages = ($) => {
  const pages = [];
  $("ul.pagination-list li").each((i, elem) => {
    const $elem = cheerio.load($(elem).html());
    const page = $elem("a").attr("data-page");
    pages.push(page);
  });

  return pages.length === 0 ? 1 : Number(pages[pages.length - 1]);
};

module.exports = {
  scrapeAnime: async (animeSlug) => {
    const { error, $ } = await getAnimePage(
      GOGOANIME_URL,
      "/category/" + animeSlug
    );
    if (error) return { error, data: null };

    const animeInfoClass = ".main_body .anime_info_body ";
    const title = $(animeInfoClass + "h1").text();
    const image = $(animeInfoClass + "img").attr("src");
    let typeObj = {
      otherName: null,
      summary: null,
      type: null,
      released: null,
      status: null,
      genres: null,
    };

    $(animeInfoClass + "p.type").each((i, element) => {
      const $type = cheerio.load($(element).html());
      switch (i) {
        // Type
        case 0:
          const type = $type("a").text();
          typeObj.type = type;
          break;
        // Summary
        case 1:
          const summary = $type.text();
          typeObj.summary = summary.replace("Plot Summary: ", "");
          break;
        // Genres
        case 2:
          const genres = [];
          $type("a").each((i, genreElem) => {
            const $genre = cheerio.load($(genreElem).html());
            genres.push(
              formatGenreData(
                $(genreElem).attr("href").split("/genre/")[1],
                $genre.text()
              )
            );
          });
          typeObj.genres = genres;
          break;
        // Released
        case 3:
          const released = $type.text();
          typeObj.released = released.replace("Released: ", "");
          break;
        // Status
        case 4:
          const status = $type("a").text();
          typeObj.status = status;
          break;
        // Other Name
        case 5:
          const otherName = $type.text();
          typeObj.otherName = otherName.replace("Other name: ", "");
          break;

        default:
          break;
      }
    });

    // Data for Get Eps API Request
    const animeEpsReqInfoClass = animeInfoClass + ".anime_info_episodes ";
    const movieID = $(animeEpsReqInfoClass + "input#movie_id").attr("value");
    const defaultEp = $(animeEpsReqInfoClass + "input#default_ep").attr(
      "value"
    );
    const animeAlias = $(animeEpsReqInfoClass + "input#alias_anime").attr(
      "value"
    );

    // Episodes
    const animeEpsInfoClass = ".main_body .anime_video_body ul#episode_page ";
    const epSections = [];
    $(animeEpsInfoClass + "li").each((i, listElem) => {
      const $list = cheerio.load($(listElem).html());
      epSections.push(
        formatEpsSection(
          Number($list("a").attr("ep_start")),
          Number($list("a").attr("ep_end"))
        )
      );
    });
    const totalEps =
      epSections.length > 0 ? epSections[epSections.length - 1].ep_end : 0;

    // Data Formating
    const { otherName, summary, type, released, status, genres } = typeObj;
    return {
      error: null,
      data: formatAnimeData(
        animeSlug,
        title,
        otherName,
        image,
        summary,
        type,
        released,
        status,
        genres,
        {
          movieID,
          defaultEp,
          animeAlias,
        },
        epSections,
        totalEps
      ),
    };
  },
  scrapeAnimeEpisodes: async (epsParams, epSection) => {
    const { ep_start, ep_end } = epSection;
    const { movieID, defaultEp, animeAlias } = epsParams;
    const { error, $ } = await getPage(
      `https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=${ep_start}&ep_end=${ep_end}&id=${movieID}&default_ep=${defaultEp}&alias=${animeAlias}`
    );
    if (error) return { error, data: null };

    // Getting Episode Links
    const episodes = [];
    $("ul li").each((i, elem) => {
      const $elem = cheerio.load($(elem).html());
      const slug = formatSlug($elem("a").attr("href"));
      const num = Number(slug.split("episode-")[1]);
      const lang = $elem("div.cate").text();
      episodes.push(formatEpData(slug, num, lang));
    });

    return {
      error: null,
      data: formatAnimeEpsData(episodes, epSection, epsParams),
    };
  },
  scrapeAnimeVideo: async (epSlug) => {
    const { error, $ } = await getAnimePage(GOGOANIME_URL, `/${epSlug}`);
    if (error) return { error, data: null };

    // Anime Info
    const animeInfoLink = $(".anime-info a");
    const title = animeInfoLink.text();
    if (!title) return { error: { response: { status: 404 } }, data: null };

    const animeSlug = formatAnimeSlug(animeInfoLink.attr("href"));

    // Video
    const src = $(".anime_video_body_watch_items iframe").attr("src");
    const prev = $(".anime_video_body_episodes_l a").attr("href");
    const next = $(".anime_video_body_episodes_r a").attr("href");

    // Video Sources
    const videoSources = [];
    $(".anime_muti_link ul li").each((i, elem) => {
      const $elem = cheerio.load($(elem).html());
      const src = $elem("a").attr("data-video");
      const name = $elem("a")
        .remove("span")
        .text()
        .trim()
        .replace("Choose this server", "");
      videoSources.push(formatVideoSourceData(src, name));
    });

    return {
      error: null,
      data: formatAnimeVideoData(
        epSlug,
        animeSlug,
        title,
        src,
        "IFRAME",
        prev ? formatSlug(prev) : null,
        next ? formatSlug(next) : null,
        videoSources
      ),
    };
  },
  scrapeSearchedAnime: async (query, page) => {
    const { error, $ } = await getAnimePage(
      GOGOANIME_URL,
      `/search.html?keyword=${query.replace("_", " ")}&page=${page}`
    );
    if (error) return { error, data: null };

    // Searched Data
    const searchedData = getAnimeListData($);

    // Searched Page Data
    const totalPages = getTotalPages($);

    return {
      error: null,
      data:
        searchedData.length > 0
          ? formatSearchData(searchedData, totalPages, page, query)
          : null,
    };
  },
  scrapeRecentAnime: async (page) => {
    const { error, $ } = await getAnimePage(GOGOANIME_URL, `?page=${page}`);
    if (error) return { error, data: null };

    const anime = [];
    $("ul.items li").each((i, elem) => {
      const $elem = cheerio.load($(elem).html());
      const image = $elem("img").attr("src");
      const epSlug = formatSlug($elem(".img a").attr("href"));
      const title = $elem("p.name").text();
      const subText = $elem("p.episode").text();
      anime.push(formatRecentData(image, epSlug, title, subText));
    });

    const totalPages = getTotalPages($);

    return {
      error: null,
      data: formatAnimeBrowseData(anime, totalPages, page),
    };
  },
  scrapePopularAnime: async (page) => {
    const { error, $ } = await getAnimePage(
      GOGOANIME_URL,
      `/popular.html?page=${page}`
    );
    if (error) return { error, data: null };

    const anime = getAnimeListData($);
    const totalPages = getTotalPages($);

    return {
      error: null,
      data: formatAnimeBrowseData(anime, totalPages, page),
    };
  },
  scrapeOngoingAnime: async (page) => {
    const { error, $ } = await getPage(
      `https://ajax.gogo-load.com/ajax/page-recent-release-ongoing.html?page=${page}`
    );
    if (error) return { error, data: null };

    const anime = [];
    $(".added_series_body ul li").each((i, elem) => {
      const $elem = cheerio.load($(elem).html());
      const image = $elem(".thumbnail-popular")
        .attr("style")
        .split("'")[1]
        .replace("'", "");
      const animeSlug = formatAnimeSlug($elem("a").attr("href"));
      const title = $elem("a").attr("title");
      const subText = $elem("p.genres").text();
      const epSlug = formatSlug($elem("a").last().attr("href"));
      const latestEp = $elem("a").last().text();
      anime.push(
        formatOngoingAnime(image, animeSlug, title, subText, epSlug, latestEp)
      );
    });
    const totalPages = getTotalPages($);

    return {
      error: null,
      data: formatAnimeBrowseData(anime, totalPages, page),
    };
  },
  scrapeNewSeasonAnime: async (page) => {
    const { error, $ } = await getAnimePage(
      GOGOANIME_URL,
      `/new-season.html?page=${page}`
    );
    if (error) return { error, data: null };

    const anime = getAnimeListData($);
    const totalPages = getTotalPages($);

    return {
      error: null,
      data: formatAnimeBrowseData(anime, totalPages, page),
    };
  },
  scrapeAnimeGenres: async () => {
    const { error, $ } = await getAnimePage(GOGOANIME_URL, "");
    if (error) return { error, data: null };

    const genres = [];
    $("li.genre ul li").each((i, elem) => {
      const $elem = cheerio.load($(elem).html());
      const genreSlug = $elem("a").attr("href");
      const genre = $elem("a").text();

      if (genre.toLowerCase() !== "hentai")
        genres.push(formatGenreData(genreSlug.split("/genre/")[1], genre));
    });

    return {
      error: null,
      data: {
        genres,
      },
    };
  },
  scrapeAnimeByGenre: async (genreSlug, page) => {
    const { error, $ } = await getAnimePage(
      GOGOANIME_URL,
      `/genre/${genreSlug}?page=${page}`
    );
    if (error) return { error, data: null };

    // Anime Genre Data
    const anime = getAnimeListData($);
    const totalPages = getTotalPages($);

    return {
      error: null,
      data: formatAnimeGenreData(anime, totalPages, page, genreSlug),
    };
  },
};
