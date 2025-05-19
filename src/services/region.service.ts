import { Region } from '../models/region.model';

export const createRegion = async (data: any) => {
  return await Region.create(data);
};
