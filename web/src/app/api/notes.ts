import { Note } from '../interfaces';
import api from './axios';

export async function getNotes(
  teamId: string | undefined = undefined,
  tagId: string | undefined = undefined
) {
  if (tagId === '') tagId = undefined;
  if (teamId === '') teamId = undefined;

  let url = '/notes';
  if (tagId && teamId) {
    url += `?team_id=${teamId}&tag_id=${tagId}`;
  } else if (tagId) {
    url += `?tag_id=${tagId}`;
  } else if (teamId) {
    url += `?team_id=${teamId}`;
  }

  return await api.get<Note[]>(url).then((res) => res.data);
}
