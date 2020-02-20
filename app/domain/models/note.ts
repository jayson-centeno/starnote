import { NoteType } from '../enums'

export default class NoteModel {
  constructor({
    id,
    title,
    content,
    type,
    deleted,
    createDate,
    modifiedDate,
    rank,
  }: {
    id?: number
    title: string
    content?: string
    type: NoteType
    deleted?: boolean
    createDate?: number
    modifiedDate?: number
    rank?: number
  }) {
    this.id = id
    this.title = title
    this.content = content
    this.type = type
    this.deleted = deleted
    this.createDate = createDate
    this.modifiedDate = modifiedDate
    this.rank = rank
  }

  id?: number
  title: string = ''
  content?: string = ''
  type: NoteType = NoteType.Note
  deleted?: boolean
  createDate?: number
  modifiedDate?: number
  rank?: number
}
