import Joi from 'joi';

export const regionSchema = Joi.object({
  name: Joi.string().required(),
  geometry: Joi.object({
    type: Joi.string().valid('Polygon').required(),
    coordinates: Joi.array().items(
      Joi.array().items(
        Joi.array().ordered(
          Joi.number().min(-180).max(180), // long
          Joi.number().min(-90).max(90), // lat
        )
      )
    ).required()
  }).required()
});