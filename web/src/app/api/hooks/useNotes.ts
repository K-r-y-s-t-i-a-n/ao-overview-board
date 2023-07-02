/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import api from '../axios';
import { Note } from '../../interfaces';
import { queryKeys } from '..';
import { useNotesStore } from '../../store';

import { format } from 'date-fns';

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((notes: any, note: Note) => {
        const date = format(note.updated_at!, 'dd MMM yyyy - EEEE');
        notes[date] = notes[date] ? [...notes[date], note] : [note];
        return notes;
      }, {} as { [key: string]: Note[] })
  );
};

async function getNotes(
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

interface UseNotes {
  sortedNotes: [string, Note[]][] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

export function useNotes(): UseNotes {
  const selectedTagId = useNotesStore((store) => store.selectedTagId);
  const selectedTeamId = useNotesStore((store) => store.selectedTeamId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sortedNotes, setSortedNotes] = useState<[string, any][] | undefined>([]);

  const {
    data: notes = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKeys.notes, selectedTeamId, selectedTagId],
    queryFn: () => getNotes(selectedTeamId, selectedTagId),
    // refetchInterval: 6000,
  });

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      if (notes.length > 0) return setSortedNotes(getSortedNotes(notes as Note[]));
      setSortedNotes([]);
    }

    return () => {
      subscribed = false;
    };
  }, [notes.length]);

  return { sortedNotes, isLoading, isFetching };
}
