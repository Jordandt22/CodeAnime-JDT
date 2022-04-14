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

// Anime API

// GET - Get Anime Episodes
animeRouter.get("/video/:epSlug", validator(AnimeVideoSchema), getAnimeVideo);

// POST - Get Anime Episodes
animeRouter.post("/episodes", bodyValidator(AnimeEpsSchema), getAnimeEpisodes);

// GET - Get Anime Data
animeRouter.get("/:animeSlug", validator(AnimeNameSchema), getAnime);

module.exports = animeRouter;
