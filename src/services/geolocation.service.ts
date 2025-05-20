import axios from 'axios';
import { AppError } from '../utils/AppError';

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  const encoded = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search.php?q=${encoded}&polygon_geojson=1&format=jsonv2`
  
  const response = await axios.get<NominatimResult[]>(url, {
    headers: { 'User-Agent': 'Oz-Map-API (ramondfalcao@gmail.com)' }
  });


  if (!response.data || response.data.length === 0) {
    throw new AppError('Address not found', 404);
  }

  const firstResult = response.data[0];

  return { 
    lat: parseFloat(firstResult.lat), 
    lng: parseFloat(firstResult.lon),
  };
};