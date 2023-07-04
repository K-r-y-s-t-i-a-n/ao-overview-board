/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import api from '../axios';
import { Note } from '../../interfaces';
import { queryKeys } from '..';
import { useNotesStore } from '../../store';

import { format } from 'date-fns';
import { notesDto } from '../types/notes.dto';

const getSortedNotes = (unsortedNotes: Note[]) => {
  const notesRegistry = new Map<string, Note>();

  unsortedNotes.forEach((note) => {
    note.created_at = new Date(note.created_at);
    note.updated_at = new Date(note.updated_at);
    notesRegistry.set(note.id, note);
  });

  return Object.entries(
    Array.from(notesRegistry.values())
      .sort((a, b) => a.updated_at!.getTime() - b.updated_at!.getTime())
      .reduce((notes: any, note: Note) => {
        const date = format(note.updated_at!, 'dd MMM yyyy - EEEE');
        notes[date] = notes[date] ? [...notes[date], note] : [note];
        return notes;
      }, {} as { [key: string]: Note[] })
  );
};

async function getNotes(
  teamId: string | undefined = undefined,
  tagId: string | undefined = undefined,
  page: number | undefined = 1
) {
  if (tagId === '') tagId = undefined;
  if (teamId === '') teamId = undefined;
  if (page === undefined) page = 1;

  let url = `/notes?page=${page}`;
  if (teamId) url += `&team_id=${teamId}`;
  if (tagId) url += `&tag_id=${tagId}`;

  return await api.get<notesDto>(url).then((res) => res.data);
}

interface UseNotes {
  sortedNotes: [string, Note[]][] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

// --------------- useNotes Main --------------- //

export function useNotes(): UseNotes {
  const selectedTagId = useNotesStore((store) => store.selectedTagId);
  const selectedTeamId = useNotesStore((store) => store.selectedTeamId);
  const currentPage = useNotesStore((store) => store.currentPage);
  const setLastPage = useNotesStore((store) => store.setLastPage);
  const [sortedNotes, setSortedNotes] = useState<[string, any][] | undefined>([]);

  const {
    data: notes = { data: [], meta: { last_page: 1, current_page: 1 } },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKeys.notes, selectedTeamId, selectedTagId, currentPage],
    queryFn: () => getNotes(selectedTeamId, selectedTagId, currentPage),
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (notes.data.length > 0) {
      setSortedNotes(getSortedNotes(notes.data as Note[]));
      setLastPage(notes.meta.last_page);
    } else {
      setSortedNotes([]);
      setLastPage(1);
    }
  }, [JSON.stringify(notes.data)]);

  return { sortedNotes, isLoading, isFetching };
}
