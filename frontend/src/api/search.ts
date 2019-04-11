import { AxiosResponse, AxiosError } from 'axios';
import { getAxiosInstance } from '../lib/axios';
import { Bike } from '../types/bike';

export async function searchBikeByBin(bikeBin: string): Promise<any> {
  if (bikeBin.length) {
    return getAxiosInstance()
      .get(`/search/${bikeBin}`)
      .then((bikes: AxiosResponse<Bike[]>) => bikes.data)
      .catch((error: AxiosError) => error);
  } else {
    return Promise.reject([]);
  }
}

export async function searchBikeById(bikeId: string): Promise<any> {
  if (bikeId.length) {
    return getAxiosInstance()
      .get(`/bikes/${bikeId}`)
      .then((bikes: AxiosResponse<Bike[]>) => bikes.data)
      .catch((error: AxiosError) => error);
  } else {
    return Promise.reject([]);
  }
}
