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
  getAnimeGenres,
  getAnimeByGenre,
} = require("../controllers/anime.api.ct");
const {
  validator: paramValidator,
  schemas: {
    AnimeNameSchema,
    AnimeVideoSchema,
    AnimeSearchSchema,
    AnimeGenreSchema,
    PageSchema,
  },
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
  ANIME_GENRES_KEY,
  ANIME_GENRE_KEY,
} = require("../redis/redis.keys");

// Anime API

// ---- Browse ----

// GET - Get Searched Anime Data
animeRouter.get(
  "/search/:query/page/:page",
  paramValidator(AnimeSearchSchema),
  checkCacheData(ANIME_SEARCH_KEY),
  getSearchedAnime
);

// GET - Get Recent Anime
animeRouter.get(
  "/recent/page/:page",
  paramValidator(PageSchema),
  checkCacheData(ANIME_RECENT_KEY),
  getRecentAnime
);

// GET - Get Popular Anime
animeRouter.get(
  "/popular/page/:page",
  paramValidator(PageSchema),
  checkCacheData(ANIME_POPULAR_KEY),
  getPopularAnime
);

// GET - Get Ongoing Anime
animeRouter.get(
  "/ongoing/page/:page",
  paramValidator(PageSchema),
  checkCacheData(ANIME_ONGOING_KEY),
  getOngoingAnime
);

// GET - Get New Season Anime
animeRouter.get(
  "/new-season/page/:page",
  paramValidator(PageSchema),
  checkCacheData(ANIME_NEW_SEASON_KEY),
  getNewSeasonAnime
);

// GET - Get Anime By Genre
animeRouter.get("/genres", checkCacheData(ANIME_GENRES_KEY), getAnimeGenres);

// GET - Get Anime By Genre
animeRouter.get(
  "/genre/:genreSlug/page/:page",
  paramValidator(AnimeGenreSchema),
  checkCacheData(ANIME_GENRE_KEY),
  getAnimeByGenre
);

// ---- Anime ----

// GET - Get Anime Video
animeRouter.get(
  "/video/:epSlug",
  paramValidator(AnimeVideoSchema),
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
  paramValidator(AnimeNameSchema),
  checkCacheData(ANIME_KEY),
  getAnime
);

module.exports = animeRouter;
