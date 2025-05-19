import { Request, Response } from 'express';
import * as RegionService from '../services/region.service';

export const create = async (req: Request, res: Response) => {
    const region = await RegionService.createRegion(req.body);
    res.status(201).json(region);
};

export const getAll = async (_req: Request, res: Response) => {
  const regions = await RegionService.getAllRegions();
  res.json(regions);
};

export const getById = async (req: Request, res: Response) => {
  const region = await RegionService.getRegionById(req.params.id);
  res.status(200).json(region);
};

export const update = async (req: Request, res: Response) => {
  const region = await RegionService.updateRegion(req.params.id, req.body);
  res.status(201).json(region);
};
