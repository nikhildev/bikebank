import log from '../lib/log';
import * as mockBikes from '../mock-data/bikes';

export class Bike {
  constructor (
    public id: number,
    public bin: string,
    public name: string,
  ) {}
}

const bikes: Bike[] = mockBikes;

export function searchBikeByBin(bikeBin: string): Bike[] {
  if (bikeBin.length) {
    return bikes.filter((bike) => bike.bin.toLowerCase() === bikeBin.toLocaleLowerCase());
    // return new Promise((resolve, reject): => {
    //   // setTimeout(() => {
    //     return resolve(bikes.filter((bike) => bike.bin === bikeBin));
    //   // }, 1000);
    // })
  } else {
    log('Empty search string');
    return [];
  }
}