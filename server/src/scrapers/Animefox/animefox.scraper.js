const cheerio = require("cheerio");
const { ANIMEFOX: ANIMEFOX_URL } = require("../../config/urls");
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

module.exports = {
  scrapeAnime: async (animeSlug) => {
    const { error, $ } = await getAnimePage(
      ANIMEFOX_URL,
      "/anime/" + animeSlug
    );
    if (error) return { error, data: null };

    // Anime Data
    const animeContent = ".anis-content ";
    const image = $(animeContent + "img.film-poster-img").attr("data-src");
    const title = $(animeContent + "h2.film-name").text();
    const summary = $(animeContent + "div.film-description").text();
    let totalEps = 0;
    const animeObj = {
      otherName: null,
      type: null,
      released: null,
      status: null,
      genres: null,
    };
    $(animeContent + ".anisc-info-wrap div.item").each((i, elem) => {
      const $elem = cheerio.load($(elem).html());

      switch (i) {
        // Other Name
        case 1:
          animeObj.otherName = $elem("span.name").text();
          break;
        // Total Eps
        case 3:
          totalEps = Number($elem("span.name").text());
          break;
        // Released
        case 6:
          animeObj.released = $elem("a").text();
          break;
        // Type
        case 7:
          animeObj.type = $elem("a").text();
          break;
        // Status
        case 8:
          animeObj.status = $elem("a").text();
          break;
        // Status
        case 9:
          const genres = [];
          $elem("a").each((i, genreElem) => {
            const $genre = cheerio.load($(genreElem).html());
            genres.push(
              formatGenreData(
                $(genreElem).attr("href").split("=")[1],
                $genre.text()
              )
            );
          });
          animeObj.genres = genres;
          break;

        default:
          break;
      }
    });

    // Data for Get Eps API Request
    const epsPageLink = $(animeContent + ".film-buttons a.btn-primary").attr(
      "href"
    );

    // Episodes
    const epSections = [];
    const numOfSections = Math.floor(totalEps / 100);
    for (let i = 0; i <= numOfSections; i + 100) {
      const ep_start = i * 100;
      const end = ep_start + 100;
      epSections.push({
        ep_start,
        ep_end: end > totalEps ? totalEps : end,
      });
    }

    const { otherName, type, released, status, genres } = animeObj;
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
          epsPageLink,
        },
        epSections,
        totalEps
      ),
    };
  },
};
