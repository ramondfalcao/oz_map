import { Request, Response } from 'express';
import * as RegionService from '../services/region.service';

export const create = async (req: Request, res: Response) => {
  const region = await RegionService.createRegion(req.body);
  res.status(201).json(region);
};