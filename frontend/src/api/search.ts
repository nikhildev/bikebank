import {default as axios} from 'axios';

import { transformRestData } from '../lib/firebase';

const API_BASE_URL = 'https://firestore.googleapis.com/v1beta1/projects/bike-bank/databases/(default)/documents';

export function searchBikeByBin(bikeBin: string): Promise<any> {
  if (bikeBin.length) {
    return axios.get(`${API_BASE_URL}/Bikes`)
      .then(res => transformRestData(res))
      .then(res => {
        return {
          ...res,
        }
      })
  } else {
    return Promise.reject([]);
  }
}