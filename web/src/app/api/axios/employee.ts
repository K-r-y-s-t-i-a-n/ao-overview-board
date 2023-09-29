import { Employee } from '../../interfaces';
import { api } from './axios';

export async function getEmployee(id: string) {
  return await api.get<Employee>(`employees/${id}`).then((res) => res.data);
}
