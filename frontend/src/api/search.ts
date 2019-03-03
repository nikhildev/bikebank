import { AxiosResponse, AxiosError } from 'axios';
import { getAxiosInstance } from 'src/lib/axios';
import { IBike } from 'src/types/bike';

export async function searchBikeByBin(bikeBin: string): Promise<any> {
  if (bikeBin.length) {
    return getAxiosInstance()
      .get(`/search/${bikeBin}`)
      .then((bikes: AxiosResponse<IBike[]>) => bikes.data)
      .catch((error: AxiosError) => error);
  } else {
    return Promise.reject([]);
  }
}
