const ANIME_SOURCES = require("../config/urls");

module.exports = {
  checkAnimeSource: async (req, res, next) => {
    const animeSource = req.params.animeSource;
    const formatedSource = animeSource.toUpperCase();
    const isValidSource = ANIME_SOURCES[formatedSource];
    if (!isValidSource)
      return res.status(400).json({ serverError: "Invalid Anime Source !" });

    req.animeSource = formatedSource;
    next();
  },
};
