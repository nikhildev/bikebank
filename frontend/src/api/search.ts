import log from '../lib/log';

const bikes = require('../mock-data/bikes');

export async function searchBikeId(bikeId: String) {
  if (bikeId.length) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(bikes);
      }, 1000);
    })
  } else {
    log('Empty search string');
    return {};
  }
}