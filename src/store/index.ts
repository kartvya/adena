import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ThemeState, createThemeSlice } from './themeSlice'

type AppState = ThemeState

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
    }),
    {
      name: 'app-storage', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
