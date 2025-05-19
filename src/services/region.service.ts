import { Region } from '../models/region.model';

export const createRegion = async (data: any) => {
  return await Region.create(data);
};

export const getAllRegions = async () => {
  return await Region.find();
};