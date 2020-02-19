import { NoteType } from '../enums/appEnum'

export default class NoteModel {
  id?: number
  title: string = ''
  content: string = ''
  type: NoteType = NoteType.Note
  deleted?: boolean
  timestamp?: number
}
