import { create } from 'zustand';

interface NotesState {
  selectedTagId: string;
  selectedTeamId: string;
  setSelectedTagId: (id: string | undefined) => void;
  setSelectedTeamId: (id: string | undefined) => void;
  resetFilters: () => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  selectedTagId: '',
  selectedTeamId: '',
  setSelectedTagId: (id) => set({ selectedTagId: id }),
  setSelectedTeamId: (id) => set({ selectedTeamId: id }),
  resetFilters: () => {
    set({ selectedTeamId: '' });
    set({ selectedTagId: '' });
  },
}));
