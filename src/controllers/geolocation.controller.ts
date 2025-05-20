import { Request, Response } from 'express';
import { geocodeAddress } from "../services/geolocation.service";
import { findRegionsContainingPoint } from "../services/region.service";
import { AppError } from '../utils/AppError';

export const getRegionsByAddress = async (req: Request, res: Response) => {
  try {
    const address = req.query.address as string;
    console.log(address);
    
    if (!address) {
      throw new AppError('address parameter is mandatory', 400)
    }

    const { lat, lng } = await geocodeAddress(address);
    const regions = await findRegionsContainingPoint(lat, lng);
    console.log(regions);

    res.json(regions);
  } catch (err: any) {
    throw new AppError('Error when searching for regions', 400)
  }
};