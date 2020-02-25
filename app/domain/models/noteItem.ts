export default class NoteItemModel {
  constructor({
    id,
    noteId,
    title,
    checked,
    rowIndex: rowIndex,
    createDate,
    modifiedDate,
    selected,
  }: {
    id?: number
    noteId?: number
    title: string
    checked?: boolean
    rowIndex: number
    createDate?: number
    modifiedDate?: number
    selected?: boolean //used only for tracking selected upon edit
  }) {
    this.id = id
    this.noteId = noteId
    this.title = title
    this.checked = checked
    this.rowIndex = rowIndex
    this.createDate = createDate
    this.modifiedDate = modifiedDate
    this.selected = selected
  }

  id?: number
  noteId?: number
  title: string = ''
  checked?: boolean = false
  rowIndex: number = 0
  createDate?: number
  modifiedDate?: number
  selected?: boolean
}
