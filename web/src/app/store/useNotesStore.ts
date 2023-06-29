import { create } from 'zustand';

interface NotesState {
  selectedTagId: string | undefined;
  selectedTeamId: string | undefined;
  setSelectedTagId: (id: string | undefined) => void;
  setSelectedTeamId: (id: string | undefined) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  selectedTagId: undefined,
  selectedTeamId: undefined,
  setSelectedTagId: (id) => set({ selectedTagId: id }),
  setSelectedTeamId: (id) => set({ selectedTeamId: id }),
}));
