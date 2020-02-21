import { DefaultTheme } from 'react-native-paper'

export const NAVIGATION = {
  NOTES: 'Notes',
  NOTE: 'Note',
  LOGIN: 'Login',
}

export const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    backdrop: 'rgba(0,0,0,0.7)',
    background: '#333',
    accent: '#FFD4AA',
  },
}

export const STORES = {
  NoteStore: 'noteStore',
}

export const RECORD = {
  defaultLimit: 5,
  defaultPage: 1,
}

export const DIName = {
  Repository: 'IRepository',
  NoteService: 'INoteService',
  NoteRepository: 'INoteRepository',
}
