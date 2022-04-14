const animeScrapers = require("../scrapers/anime.scrapers");
const { formatData } = require("../utils/global.util");
const { scraperErrorHandler } = require("../utils/scraping.util");

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

    res.status(200).json(formatData(animeSource, data));
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

    res.status(200).json(formatData(animeSource, data));
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

    res.status(200).json(formatData(animeSource, data));
  },
};
