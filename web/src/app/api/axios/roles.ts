import { Role } from '../../interfaces/role.interface';
import api from './axios';

export async function getRoles() {
  return await api.get<Role[]>('/roles').then((res) => res.data);
}
