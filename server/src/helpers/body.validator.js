const Joi = require("joi");

// Anime Episodes
const AnimeEpsSchema = Joi.object()
  .keys({
    movieID: Joi.string().trim().min(1).max(100).required(),
    defaultEp: Joi.string().trim().min(1).max(100).required(),
    animeAlias: Joi.string().trim().min(1).max(1500).required(),
    epSection: Joi.object().keys({
      ep_start: Joi.number().min(0).max(10000).required(),
      ep_end: Joi.number().min(1).max(10000).required(),
    }),
  })
  .options({ abortEarly: false });

module.exports = {
  validator: (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    const error = result.error;
    if (error) {
      let serverErrors = {};
      error.details.map((e) => (serverErrors[e.context.label] = e.message));
      return res.status(422).json({ serverErrors });
    }

    next();
  },
  schemas: {
    AnimeEpsSchema,
  },
};
