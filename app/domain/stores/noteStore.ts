import { INoteService, INoteItemService } from '../interfaces/contracts'
import NoteModel from '../models/note'
import { observable, action, computed } from 'mobx'
import { container } from '../di'
import { DIName, RECORD } from '../constants'
import { unixDateConverter } from '../helper'
import { NoteType } from '../enums'
import NoteItemModel from '../models/noteItem'

const defaults = {
  loading: false,
  errors: null,
  showCalc: false,
  isEditing: false,
  isNew: false,
  loaded: false,
  showAddOption: false,
  showDelete: false,
  oldNoteModel: <NoteModel>{},
  listEditMode: false,
  noteModel: <NoteModel>{},
  notes: Array<NoteModel>(),
}

export class NoteStore {
  private noteService: INoteService<NoteModel>
  private noteItemService: INoteItemService<NoteItemModel>

  constructor(noteService: INoteService<NoteModel>, noteItemService: INoteItemService<NoteItemModel>) {
    this.noteService = noteService
    this.noteItemService = noteItemService
  }

  @observable header = defaults

  @computed get hasNotes(): boolean {
    return this.header.notes.length > 0
  }

  @action.bound showDeleteDialog() {
    this.header.showDelete = true
  }

  @action.bound addListItem(noteItemModel: NoteItemModel) {
    noteItemModel.noteId = this.header.noteModel.id
    this.header.noteModel.items!.push(noteItemModel)

    console.log(this.header.noteModel.items)
  }

  @action.bound async edit(model: NoteModel) {
    this.header.isEditing = true
    this.header.isNew = false

    this.header.oldNoteModel = <NoteModel>{ ...model }
    this.header.noteModel = model

    if (model.type == NoteType.List) {
      var result = await this.noteItemService.getAll({
        order: 'index DESC',
        where: {
          noteId_eq: model.id,
        },
      })

      if (result.data.length > 0) {
        this.header.noteModel.items = observable.array(
          (result.data as []).map((data: any) => <NoteItemModel>{ ...data })
        )
      } else {
        this.header.noteModel.items = observable.array(<NoteItemModel[]>[])
      }
    }
  }

  @action.bound add(model: NoteModel) {
    this.header.isEditing = true
    this.header.isNew = true

    if (model.type == NoteType.List) {
      model.items = observable.array(<NoteItemModel[]>[])
    }

    this.header.noteModel = model
  }

  @action.bound async loadNotes() {
    if (this.header.loading) {
      return
    }

    this.header.loading = true
    var all = await this.noteService.getAll({
      order: 'modifiedDate DESC',
      limit: RECORD.defaultLimit,
      page: RECORD.defaultPage,
    })
    this.header.loading = false
    // console.log(all)
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
    this.header.noteModel = <NoteModel>{}
    this.header.showAddOption = true

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

    //New record
    if (this.header.noteModel.id === null || this.header.noteModel.id === 0 || this.header.noteModel.id === undefined) {
      this.header.noteModel.createDate = Date.now()
      this.header.noteModel.modifiedDate = Date.now()

      //make sure one of the field has value
      if (this.header.noteModel.title || this.header.noteModel.content) {
        if (!this.header.noteModel.title) {
          this.header.noteModel.title = unixDateConverter(this.header.noteModel.createDate)
        } else {
          this.header.noteModel.title = this.header.noteModel.title.trim()
        }

        var result = await this.noteService.add(<NoteModel>{ ...this.header.noteModel })
        if (!result.successful) {
          console.log('New save failed', result)
        }

        console.log('New save successful')
      }

      //Update record
    } else {
      if (
        this.header.noteModel.title === this.header.oldNoteModel.title &&
        this.header.noteModel.content === this.header.oldNoteModel.content &&
        this.header.noteModel.rank === this.header.oldNoteModel.rank
      ) {
        this.header.isEditing = false
        this.header.loading = false
        return
      }

      if (!this.header.noteModel.title) {
        this.header.noteModel.title = unixDateConverter(Date.now())
      } else {
        this.header.noteModel.title = this.header.noteModel.title.trim()
      }

      this.header.noteModel.modifiedDate = Date.now()
      var result = await this.noteService.update(<NoteModel>{ ...this.header.noteModel })
      if (!result.successful) {
        console.log('New update failed', result)
      }

      console.log('New update successful')
    }

    this.header.isEditing = false
    this.header.loading = false
  }
}

export default new NoteStore(
  container.get<INoteService<NoteModel>>(DIName.NoteService),
  container.get<INoteItemService<NoteItemModel>>(DIName.NoteItemService)
)
