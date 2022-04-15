const animeScrapers = require("../scrapers/anime.scrapers");
const { formatData } = require("../utils/global.util");
const { scraperErrorHandler } = require("../utils/scraping.util");
const { cacheData } = require("../redis/redis.mw");
const {
  ANIME_KEY,
  ANIME_EPISODES_KEY,
  ANIME_VIDEO_KEY,
} = require("../redis/redis.keys");

// Route Error Handler
const routerErrorHandler = (res, error) => {
  const errorInfo = scraperErrorHandler(error);
  res.status(errorInfo.status).json({ ...errorInfo });
};

module.exports = {
  getAnime: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { animeSlug } = req.params;
    const { scrapeAnime } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnime(animeSlug);
    if (error || !data)
      return routerErrorHandler(
        res,
        error ? error : { response: { status: 500 } }
      );

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
    if (error || !data)
      return routerErrorHandler(
        res,
        error ? error : { response: { status: 500 } }
      );

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_EPISODES_KEY, { animeSource, ...req.body }, formatedData);
    res.status(200).json(formatedData);
  },
  getAnimeVideo: async (req, res, next) => {
    const animeSource = req.animeSource;
    const { epSlug } = req.params;
    const { scrapeAnimeVideo } = animeScrapers[animeSource];
    const { error, data } = await scrapeAnimeVideo(epSlug);
    if (error || !data)
      return routerErrorHandler(
        res,
        error ? error : { response: { status: 500 } }
      );

    const formatedData = formatData(animeSource, data);
    cacheData(ANIME_VIDEO_KEY, { animeSource, epSlug }, formatedData);
    res.status(200).json(formatedData);
  },
};
