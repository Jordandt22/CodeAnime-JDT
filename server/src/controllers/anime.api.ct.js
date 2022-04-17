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
  ANIME_GENRE_KEY,
  ANIME_GENRES_KEY,
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

// Format & Cache Data
const formatAndCacheData = async (animeSource, data, key, keyParams) => {
  const formatedData = formatData(animeSource, data);
  await cacheData(key, { animeSource, ...keyParams }, formatedData);
  return formatedData;
};

module.exports = {
  getAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { animeSlug } = req.params;
    const { scrapeAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnime(animeSlug);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_KEY,
      { animeSlug }
    );
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

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_EPISODES_KEY,
      { ...req.body }
    );
    res.status(200).json(formatedData);
  },
  getAnimeVideo: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { epSlug } = req.params;
    const { scrapeAnimeVideo } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnimeVideo(epSlug);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_VIDEO_KEY,
      { epSlug }
    );
    res.status(200).json(formatedData);
  },
  getSearchedAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { query, page } = req.params;
    const { scrapeSearchedAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeSearchedAnime(query, page);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_SEARCH_KEY,
      { query, page }
    );
    res.status(200).json(formatedData);
  },
  getRecentAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { page } = req.params;
    const { scrapeRecentAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeRecentAnime(page);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_RECENT_KEY,
      { page }
    );
    res.status(200).json(formatedData);
  },
  getPopularAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { page } = req.params;
    const { scrapePopularAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapePopularAnime(page);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_POPULAR_KEY,
      { page }
    );
    res.status(200).json(formatedData);
  },
  getOngoingAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { page } = req.params;
    const { scrapeOngoingAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeOngoingAnime(page);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_ONGOING_KEY,
      { page }
    );
    res.status(200).json(formatedData);
  },
  getNewSeasonAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { page } = req.params;
    const { scrapeNewSeasonAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeNewSeasonAnime(page);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_NEW_SEASON_KEY,
      { page }
    );
    res.status(200).json(formatedData);
  },
  getAnimeGenres: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { scrapeAnimeGenres } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnimeGenres();
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_GENRES_KEY,
      {}
    );
    res.status(200).json(formatedData);
  },
  getAnimeByGenre: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { genreSlug, page } = req.params;
    const { scrapeAnimeByGenre } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnimeByGenre(genreSlug, page);
    if (error || !data) return routerErrorHandler(res, checkError(error, data));

    const formatedData = await formatAndCacheData(
      animeSource,
      data,
      ANIME_GENRE_KEY,
      { genreSlug, page }
    );
    res.status(200).json(formatedData);
  },
};
