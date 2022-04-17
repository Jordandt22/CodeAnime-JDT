const animeScrapers = require("../scrapers/anime.scrapers");
const { formatData } = require("../utils/global.util");
const { scraperErrorHandler } = require("../utils/scraping.util");
const { cacheData } = require("../redis/redis.mw");
const {
  ANIME_KEY,
  ANIME_EPISODES_KEY,
  ANIME_VIDEO_KEY,
  ANIME_SEARCH_KEY,
  ANIME_RECENT_KEY,
  ANIME_POPULAR_KEY,
  ANIME_ONGOING_KEY,
  ANIME_NEW_SEASON_KEY,
} = require("../redis/redis.keys");

// Route Error Handler
const routerErrorHandler = (res, error) => {
  const errorInfo = scraperErrorHandler(error);
  res.status(errorInfo.status).json({ ...errorInfo });
};

// Check Error
const checkError = (error, data) =>
  error
    ? error
    : !data
    ? { response: { status: 404 } }
    : { response: { status: 500 } };

module.exports = {
  getAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { animeSlug } = req.params;
    const { scrapeAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnime(animeSlug);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_KEY, { animeSource, animeSlug }, formatedData);
    res.status(200).json(formatedData);
  },
  getAnimeEpisodes: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { movieID, defaultEp, animeAlias, epSection } = req.body;
    const { scrapeAnimeEpisodes } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnimeEpisodes(
      {
        movieID,
        defaultEp,
        animeAlias,
      },
      epSection
    );
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_EPISODES_KEY, { animeSource, ...req.body }, formatedData);
    res.status(200).json(formatedData);
  },
  getAnimeVideo: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { epSlug } = req.params;
    const { scrapeAnimeVideo } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnimeVideo(epSlug);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_VIDEO_KEY, { animeSource, epSlug }, formatedData);
    res.status(200).json(formatedData);
  },
  getSearchedAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { query, page } = req.params;
    const { scrapeSearchedAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeSearchedAnime(query, page);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_SEARCH_KEY, { animeSource, query, page }, formatedData);
    res.status(200).json(formatedData);
  },
  getRecentAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { scrapeRecentAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeRecentAnime();
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_RECENT_KEY, { animeSource }, formatedData);
    res.status(200).json(formatedData);
  },
  getPopularAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { scrapePopularAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapePopularAnime();
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_POPULAR_KEY, { animeSource }, formatedData);
    res.status(200).json(formatedData);
  },
  getOngoingAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { scrapeOngoingAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeOngoingAnime();
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_ONGOING_KEY, { animeSource }, formatedData);
    res.status(200).json(formatedData);
  },
  getNewSeasonAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { scrapeNewSeasonAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeNewSeasonAnime();
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_NEW_SEASON_KEY, { animeSource }, formatedData);
    res.status(200).json(formatedData);
  },
};
