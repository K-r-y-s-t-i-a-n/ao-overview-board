/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { api } from '../api/axios';
import { User } from '../interfaces';

interface UserState {
  data: User | undefined;
  isLoading: boolean;
  isLogginIn: boolean;
  isLoggingOut: boolean;
  isUpdatingPhoto: boolean;
  error: any;
  getUser: () => void;
  getUserAfterLogin: () => void;
  updateUserPhoto: () => void;
  logout: () => void;
  // ============
  setUser: (user: User | undefined) => void;
  setLoading: (isLoading: boolean) => void;
}

// =====================
export const useUserStore = create<UserState>((set) => ({
  data: undefined,
  isLoading: false,
  isLogginIn: false,
  isLoggingOut: false,
  isUpdatingPhoto: false,
  error: null,
  getUser: async () => {
    try {
      set({ isLoading: true });
      const res = await api.get<User>('/me');
      set({ isLoading: false, data: res.data });
    } catch (err: any) {
      set({ error: err.message, isLoading: false, data: undefined }); // added data undefined
    }
  },

  getUserAfterLogin: async () => {
    try {
      set({ isLogginIn: true });
      const res = await api.get<User>('/me');
      set({ isLogginIn: false, data: res.data });
    } catch (err: any) {
      set({ error: err.message, isLogginIn: false });
    }
  },

  updateUserPhoto: async () => {
    try {
      set({ isLoading: false, isUpdatingPhoto: true });
      await api.post<User>('/me');
      const res = await api.get<User>('/me');
      set({ isUpdatingPhoto: false, data: res.data });
    } catch (err: any) {
      set({ error: err.message, isUpdatingPhoto: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true, isLoading: true });
      await api.post<void>('/logout');
      set({ data: undefined, isLoggingOut: false, isLoading: false });
    } catch (err: any) {
      set({ isLoggingOut: false, isLoading: false });
      console.log(err.message);
    }
  },

  // ===========================

  setUser: (user) => {
    set({ data: user });
  },
  setLoading: (isLoading) => {
    set({ isLoading: isLoading });
  },
}));
