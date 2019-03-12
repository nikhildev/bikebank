import { getAxiosInstance } from 'src/lib/axios';
import { Bike } from 'src/types/bike';

export async function searchBikeByBin(bikeBin: string): Promise<any> {
  if (bikeBin.length) {
    try {
      const bikeData = await getAxiosInstance().get(`/search/${bikeBin}`);
      return bikeData.data as Bike[];
    } catch (error) {
      console.error(error);
    }
  }
  return [] as Bike[];
}

export async function searchBikeById(bikeId: string): Promise<Bike[]> {
  if (bikeId.length) {
    try {
      const bikeData = await getAxiosInstance().get(`/bikes/${bikeId}`);
      return bikeData.data as Bike[];
    } catch (error) {
      console.error(error);
    }
  }
  return [] as Bike[];
}

export async function getBikesForUser(): Promise<Bike[]> {
  try {
    const bikeData = await getAxiosInstance().get(`/bikes`);
    return bikeData.data as Bike[];
  } catch (error) {
    console.error(error);
  }
  return [] as Bike[];
}
