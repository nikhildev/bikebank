import * as axios from 'axios';
import { getTokens } from '../lib/firebase';
import { store } from '../index';
import { setLogoutSuccessAction } from 'src/actions';

export enum AxiosErrors {
  Unknown = 'UNKNOWN',
  Unauthorized = 'UNAUTHORIZED',
}

export const getAxiosInstance = () => {
  const axiosInstance = axios.default.create();
  axiosInstance.defaults.headers.common['X-ID-Token'] = getTokens().idToken;
  axiosInstance.interceptors.response.use(
    res => res,
    (error: axios.AxiosError) => {
      let axiosError = AxiosErrors.Unknown;
      if (error.response) {
        switch (error.response.status) {
          case 401:
            axiosError = AxiosErrors.Unauthorized;
            store.dispatch(setLogoutSuccessAction());
            break;
          default:
            axiosError = AxiosErrors.Unknown;
        }
      }
      return Promise.reject(axiosError);
    },
  );
  return axiosInstance;
};
