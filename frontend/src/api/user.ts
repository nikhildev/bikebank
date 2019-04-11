import { getAxiosInstance } from '../lib/axios';

export async function ping() {
  const res = await getAxiosInstance().get('/user');
  return res;
}
