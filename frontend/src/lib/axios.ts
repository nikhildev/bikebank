import * as axios from 'axios';
import { getIdToken } from '../lib/firebase';

export enum AxiosErrors {
  Unknown = 'UNKNOWN',
  Unauthorized = 'UNAUTHORIZED',
}

export const getAxiosInstance = () => {
  const axiosInstance = axios.default.create();
  axiosInstance.interceptors.request.use(
    async options => {
      options.headers['X-ID-Token'] = await getIdToken();
      return options;
    },
    error => {
      console.error(error);
    },
  );
  return axiosInstance;
};
