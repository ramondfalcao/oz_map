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

  if (!region) {
    throw new AppError('Region not found', 404);
  }

  return region;
};

export const updateRegion = async (id: string, data: any) => {
  const responseUpdate = await Region.findByIdAndUpdate(id, data, { new: true });

  if (!responseUpdate) {
    throw new AppError('Region not found', 404)
  }

  return responseUpdate;
};

export const deleteRegion = async (id: string) => {
  const responseDelete = await Region.findByIdAndDelete(id);

  if(!responseDelete) {
    throw new AppError('Region not found');
  }

  return { message: 'Deleted region!'};
};

export const findRegionsContainingPoint = async (latitude: number, longitude: number) => {
  const response = Region.find({
    geometry: {
      $geoIntersects: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }
    }
  });

  return response;
};

export const findRegionNearPoint = async (latitude: number, longitude: number, distance: number) => {
  const response =  Region.find({
    geometry: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: distance
      }
    }
  });

  return response;
}