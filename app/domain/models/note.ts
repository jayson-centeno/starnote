import { NoteType } from '../enums'

export default class NoteModel {
  constructor({
    id,
    title,
    content,
    type,
    deleted,
    timestamp,
  }: {
    id?: number
    title: string
    content?: string
    type: NoteType
    deleted?: boolean
    timestamp?: number
  }) {
    this.id = id
    this.title = title
    this.content = content
    this.type = type
    this.deleted = deleted
    this.timestamp = timestamp
  }

  id?: number
  title: string = ''
  content?: string = ''
  type: NoteType = NoteType.Note
  deleted?: boolean
  timestamp?: number
}
