import { Request, Response } from 'express';
import { geocodeAddress } from "../services/geolocation.service";
import { findRegionsContainingPoint } from "../services/region.service";
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';

export const getRegionsByAddress = async (req: Request, res: Response) => {
  try {
    logger.info('Searching regions for address...');
    const address = req.query.address as string;

    if (!address) {
      throw new AppError('address parameter is mandatory', 400)
    }

    const { lat, lng } = await geocodeAddress(address);
    const regions = await findRegionsContainingPoint(lat, lng);

    res.json(regions);
  } catch (err: any) {
    logger.error(`Error geocoding: ${err.message}`);
    throw new AppError('Error when searching for regions', 400)
  }
};