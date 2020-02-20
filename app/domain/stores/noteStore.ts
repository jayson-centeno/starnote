import { INoteService } from '../interfaces/contracts'
import NoteModel from '../models/note'
import { observable, action, computed } from 'mobx'
import { container } from '../di'
import { DIName } from '../constants'

const defaults = {
  loading: false,
  errors: null,
  showCalc: false,
  isEditing: false,
  isNew: false,
  loaded: false,
  showDelete: false,
  noteModel: <NoteModel>{},
  notes: Array<NoteModel>(),
}

export class NoteStore {
  private noteService: INoteService<NoteModel>

  constructor(noteService: INoteService<NoteModel>) {
    this.noteService = noteService
  }

  @observable header = defaults

  @computed get hasNotes(): boolean {
    return this.header.notes.length > 0
  }

  @action.bound showDeleteDialog() {
    this.header.showDelete = true
  }

  @action.bound edit(model: NoteModel) {
    this.header.isEditing = true
    this.header.isNew = false
    this.header.noteModel = model
  }

  @action.bound add(model: NoteModel) {
    this.header.isEditing = true
    this.header.isNew = true
    this.header.noteModel = model
  }

  @action.bound async loadNotes() {
    if (this.header.loading) {
      return
    }

    this.header.loading = true
    var all = await this.noteService.getAll()
    this.header.loading = false
    if (all && all.data.length > 0) {
      this.header.notes = all.data.map((model: any) => new NoteModel({ ...model }))
    } else {
      this.header.notes = Array<NoteModel>()
    }
  }

  @action.bound async delete(noteModel: NoteModel) {
    if (this.header.loading) {
      return
    }

    this.header.loading = true
    var result = await this.noteService.delete(<NoteModel>{ ...noteModel })
    this.header.loading = false
    this.header.isEditing = false
    this.header.isNew = false
    this.loadNotes()

    if (result.successful) {
      return true
    }

    return false
  }

  @action.bound async save() {
    if (this.header.loading) {
      return
    }

    this.header.loading = true
    if (this.header.noteModel.id === null || this.header.noteModel.id === 0 || this.header.noteModel.id === undefined) {
      var result = await this.noteService.add(<NoteModel>{ ...this.header.noteModel })
      if (!result.successful) {
      }
    } else {
      var result = await this.noteService.update(<NoteModel>{ ...this.header.noteModel })
      if (!result.successful) {
      }
    }

    this.header.isEditing = false
    this.header.loading = false

    this.loadNotes()
  }
}

export default new NoteStore(container.get<INoteService<NoteModel>>(DIName.NoteService))
