import { NoteType } from '../enums'
import NoteItemModel from './noteItem'

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
    items,
  }: {
    id?: number
    title: string
    content?: string
    type: NoteType
    deleted?: boolean
    createDate?: number
    modifiedDate?: number
    rank?: number
    items?: Array<NoteItemModel>
  }) {
    this.id = id
    this.title = title
    this.content = content
    this.type = type
    this.deleted = deleted
    this.createDate = createDate
    this.modifiedDate = modifiedDate
    this.rank = rank
    this.items = items
  }

  id?: number
  title: string = ''
  content?: string = ''
  type: NoteType = NoteType.Note
  deleted?: boolean
  createDate?: number
  modifiedDate?: number
  rank?: number
  items?: Array<NoteItemModel>
}
