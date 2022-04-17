const animeRouter = require("express-promise-router")();
const {
  getAnime,
  getAnimeEpisodes,
  getAnimeVideo,
  getSearchedAnime,
  getRecentAnime,
  getPopularAnime,
  getOngoingAnime,
  getNewSeasonAnime,
} = require("../controllers/anime.api.ct");
const {
  validator,
  schemas: { AnimeNameSchema, AnimeVideoSchema, AnimeSearchSchema },
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
  ANIME_SEARCH_KEY,
  ANIME_RECENT_KEY,
  ANIME_POPULAR_KEY,
  ANIME_ONGOING_KEY,
  ANIME_NEW_SEASON_KEY,
} = require("../redis/redis.keys");

// Anime API

// ---- Browse ----

// GET - Get Searched Anime Data
animeRouter.get(
  "/search/:query/page/:page",
  validator(AnimeSearchSchema),
  checkCacheData(ANIME_SEARCH_KEY),
  getSearchedAnime
);

// GET - Get Recent Anime
animeRouter.get("/recent", checkCacheData(ANIME_RECENT_KEY), getRecentAnime);

// GET - Get Popular Anime
animeRouter.get("/popular", checkCacheData(ANIME_POPULAR_KEY), getPopularAnime);

// GET - Get Ongoing Anime
animeRouter.get("/ongoing", checkCacheData(ANIME_ONGOING_KEY), getOngoingAnime);

// GET - Get New Season Anime
animeRouter.get(
  "/new-season",
  checkCacheData(ANIME_NEW_SEASON_KEY),
  getNewSeasonAnime
);

// ---- Anime ----

// GET - Get Anime Video
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
