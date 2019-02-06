import * as axios from 'axios';
import { getTokens } from '../lib/firebase';


export const getAxiosInstance = () => {
  const axiosInstance = axios.default.create();
  axiosInstance.defaults.headers.common['X-ID-Token'] = getTokens().idToken;
  return axiosInstance;
}
