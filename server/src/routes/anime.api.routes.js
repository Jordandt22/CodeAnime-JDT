const animeRouter = require("express-promise-router")();
const {
  getAnime,
  getAnimeEpisodes,
  getAnimeVideo,
} = require("../controllers/anime.api.ct");
const {
  validator,
  schemas: { AnimeNameSchema, AnimeVideoSchema },
} = require("../helpers/params.validator");
const {
  validator: bodyValidator,
  schemas: { AnimeEpsSchema },
} = require("../helpers/body.validator");
const { checkCacheData } = require("../redis/redis.mw");
const {
  ANIME_KEY,
  ANIME_EPISODES_KEY,
  ANIME_VIDEO_KEY,
} = require("../redis/redis.keys");

// Anime API

// GET - Get Anime Episodes
animeRouter.get(
  "/video/:epSlug",
  validator(AnimeVideoSchema),
  checkCacheData(ANIME_VIDEO_KEY),
  getAnimeVideo
);

// POST - Get Anime Episodes
animeRouter.post(
  "/episodes",
  bodyValidator(AnimeEpsSchema),
  checkCacheData(ANIME_EPISODES_KEY),
  getAnimeEpisodes
);

// GET - Get Anime Data

animeRouter.get(
  "/:animeSlug",
  validator(AnimeNameSchema),
  checkCacheData(ANIME_KEY),
  getAnime
);

module.exports = animeRouter;
