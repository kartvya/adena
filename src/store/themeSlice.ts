import { StateCreator } from 'zustand'

export interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const createThemeSlice: StateCreator<ThemeState> = (set, get) => ({
  theme: 'dark',
  toggleTheme: () =>
    set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
})
