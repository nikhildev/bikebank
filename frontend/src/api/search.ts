import {default as axios} from 'axios';

import { transformRestData } from '../lib/firebase';
// import { Bike } from '../types/bike';

const API_BASE_URL = 'https://firestore.googleapis.com/v1beta1/projects/bike-bank/databases/(default)/documents';

// export class Bike {
//   constructor (
//     public id: number,
//     public bin: string,
//     public name: string,
//   ) {}
// }

// const bikes: Bike[] = mockBikes;

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