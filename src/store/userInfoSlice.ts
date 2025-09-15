import { StateCreator } from 'zustand';

export interface UserState {
    user: { id: string; name: string } | null;
    setUser: (user: { id: string; name: string } | null) => void;
}

export const createUserSlice: StateCreator<UserState> = (set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
})
