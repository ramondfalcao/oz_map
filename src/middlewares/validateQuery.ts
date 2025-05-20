import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required()
});

export const validateQuery = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
