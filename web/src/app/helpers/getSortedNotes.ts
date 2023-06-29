/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { format } from 'date-fns';
import { Note } from '../interfaces';

export const getSortedNotes = (unsortedNotes: Note[]) => {
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
