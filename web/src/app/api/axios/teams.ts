import { Team } from '../../interfaces';
import api from './axios';

export async function getTeams() {
  return await api.get<Team[]>('/teams').then((res) => res.data);
}
