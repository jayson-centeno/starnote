import { NoteStore } from '../stores/noteStore'
import { Theme } from 'react-native-paper'

export interface INoteProps {
  title?: string
  navigation?: any
  noteStore?: NoteStore
  theme: Theme
}

export type IHomeState = {
  showAddOptions: boolean
}

export interface IHomeProps {
  navigation: any
  noteStore: NoteStore
  theme: Theme
  showAddOption: boolean
}
