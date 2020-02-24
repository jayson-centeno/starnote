export default class NoteItemModel {
  constructor({
    id,
    noteId,
    title,
    checked,
    rowIndex: rowIndex,
    createDate,
    modifiedDate,
  }: {
    id?: number
    noteId?: number
    title: string
    checked?: boolean
    rowIndex: number
    createDate?: number
    modifiedDate?: number
  }) {
    this.id = id
    this.noteId = noteId
    this.title = title
    this.checked = checked
    this.rowIndex = rowIndex
    this.createDate = createDate
    this.modifiedDate = modifiedDate
  }

  id?: number
  noteId?: number
  title: string = ''
  checked?: boolean = false
  rowIndex: number = 0
  createDate?: number
  modifiedDate?: number
}
