import log from '../lib/log';

export async function searchBikeId(bikeId: String) {
  if (bikeId.length) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Will Search for ${bikeId}`);
      }, 1000);
    })
  } else {
    log('Empty search string');
    return {};
  }
}