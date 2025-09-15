import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ThemeState, createThemeSlice } from './themeSlice'
import { UserState, createUserSlice } from './userInfoSlice'

type AppState = ThemeState & UserState

export const useAppStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
  ...createUserSlice(...a),
    }),
    {
      name: 'app-storage', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
