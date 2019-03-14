import { getAxiosInstance } from 'src/lib/axios';

export async function ping() {
  const res = await getAxiosInstance().get('/user');
  return res;
}
