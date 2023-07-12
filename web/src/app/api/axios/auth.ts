import { User } from '../../interfaces';
import { api } from './axios';

export async function getUser() {
  return await api.get<User>('/me').then((res) => res.data);
}
