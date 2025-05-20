import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

const schema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  distance: Joi.number().positive().required()
});

export const validateNearQuery = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.query);
  if (error) {
    throw new AppError(error?.details[0].message, 400)
  }
  next();
};
