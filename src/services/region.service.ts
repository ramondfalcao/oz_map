import { Region } from '../models/region.model';
import { AppError } from '../utils/AppError';

export const createRegion = async (data: any) => {
  return await Region.create(data);
};

export const getAllRegions = async () => {
  return await Region.find();
};

export const getRegionById = async (id: string) => {
  const region = await Region.findById(id);

  if(!region) {
    throw new AppError('Region not found', 404);
  }
  
  return region;
};

export const updateRegion = async (id: string, data: any) => {
  const response = await Region.findByIdAndUpdate(id, data, { new: true });

  if(!response) {
    throw new AppError('Region not found', 404);
  }
  
  return response;
};