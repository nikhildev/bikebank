import * as axios from 'axios';
import { getAccessToken } from '../lib/firebase';

const axiosInstance = axios.default.create();

axiosInstance.defaults.headers.common['X-Access-Token'] = getAccessToken();

export default axiosInstance;
