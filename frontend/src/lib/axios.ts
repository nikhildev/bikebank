import Axios, * as axios from 'axios';
import { getTokens, refreshIdToken } from '../lib/firebase';

export enum AxiosErrors {
  UNKNOWN = 'UNKNOWN',
  UNAUTHORIZED = 'UNAUTHORIZED',
};

export const getAxiosInstance = () => {
  const axiosInstance = axios.default.create();
  axiosInstance.defaults.headers.common['X-ID-Token'] = getTokens().idToken;
  axiosInstance.interceptors.response.use(res => res, async (error: axios.AxiosError) => {
    let axiosError = AxiosErrors.UNKNOWN;

    if (error.response) {
      switch (error.response.status) {
        case 401:
          axiosError = AxiosErrors.UNAUTHORIZED;
          console.info('Attempting to refresh id token');
          return refreshIdToken().then(() => {
            console.info('Refreshed token');
            error.config.headers['X-ID-Token'] = getTokens().idToken;
            error.config.baseURL = undefined;
            return Axios.request(error.config);
          }).catch(error => {
            console.error('Error refreshing id token', error)
          });
          break;
        default:
          axiosError = AxiosErrors.UNKNOWN;
      }
    }
      
    return Promise.reject(axiosError);
  });
  return axiosInstance;
}
