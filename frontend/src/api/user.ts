import { getAxiosInstance } from 'src/lib/axios';

export async function ping() {
  await getAxiosInstance().get('/user');
  console.log('Pinged');
}
