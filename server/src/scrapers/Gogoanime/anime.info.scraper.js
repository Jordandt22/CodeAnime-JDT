const cheerio = require("cheerio");
const { GOGOANIME: GOGOANIME_URL } = require("../../config/urls");
const {
  getPage,
  getAnimePage,
  formatAnimeData,
  formatAnimeEpData,
  formatAnimeVideoData,
} = require("../../utils/scraping.util");
const { formatSlug } = require("../../utils/global.util");

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
            genres.push({
              link: $(genreElem).attr("href").split("/genre/")[1],
              genre: $genre.text(),
            });
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
      epSections.push({
        ep_start: Number($list("a").attr("ep_start")),
        ep_end: Number($list("a").attr("ep_end")),
      });
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
      episodes.push({ slug, num, lang });
    });

    return {
      error: null,
      data: formatAnimeEpData(episodes, epSection, epsParams),
    };
  },
  scrapeAnimeVideo: async (epSlug) => {
    const { error, $ } = await getAnimePage(GOGOANIME_URL, `/${epSlug}`);
    if (error) return { error, data: null };

    // Anime Info
    const animeInfoLink = $(".anime-info a");
    const title = animeInfoLink.text();
    const animeSlug = animeInfoLink.attr("href").replace("/category/", "");

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
      videoSources.push({ src, name });
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
};
