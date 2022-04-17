const Joi = require("joi");

// Anime Name
const AnimeNameSchema = Joi.object()
  .keys({
    animeSlug: Joi.string().trim().min(1).max(1500).required(),
  })
  .options({ abortEarly: false });

// Anime Video
const AnimeVideoSchema = Joi.object()
  .keys({
    epSlug: Joi.string().trim().min(1).max(1500).required(),
  })
  .options({ abortEarly: false });

// Anime Search
const AnimeSearchSchema = Joi.object()
  .keys({
    query: Joi.string().trim().min(1).max(1500).required(),
    page: Joi.number().min(1).max(20).required(),
  })
  .options({ abortEarly: false });

module.exports = {
  validator: (schema) => (req, res, next) => {
    const result = schema.validate(req.params);
    const error = result.error;
    if (error) {
      let serverErrors = {};
      error.details.map((e) => (serverErrors[e.context.label] = e.message));
      return res.status(422).json({ serverErrors });
    }

    next();
  },
  schemas: {
    AnimeNameSchema,
    AnimeVideoSchema,
    AnimeSearchSchema,
  },
};
