import { create } from 'zustand';

interface NotesState {
  selectedTagId: string;
  selectedTeamId: string;
  currentPage: number;
  lastPage: number;
  setSelectedTagId: (id: string | undefined) => void;
  setSelectedTeamId: (id: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  setLastPage: (lastPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetFilters: () => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  selectedTagId: '',
  selectedTeamId: '',
  currentPage: 1,
  lastPage: 1,
  setSelectedTagId: (id) => set({ selectedTagId: id }),
  setSelectedTeamId: (id) => set({ selectedTeamId: id }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setLastPage: (lastPage) => set({ lastPage: lastPage }),
  nextPage: () => {
    if (get().currentPage < get().lastPage) {
      set({ currentPage: get().currentPage + 1 });
    }
  },
  prevPage: () => {
    if (get().currentPage > 1) {
      set({ currentPage: get().currentPage - 1 });
    }
  },
  resetFilters: () => {
    set({ selectedTeamId: '' });
    set({ selectedTagId: '' });
    set({ currentPage: 1 });
    set({ lastPage: 1 });
  },
}));
