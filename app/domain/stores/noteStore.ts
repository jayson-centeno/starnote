import { INoteService, INoteItemService } from '../interfaces/contracts'
import NoteModel from '../models/note'
import { observable, action, computed } from 'mobx'
import { container } from '../di'
import { DIName, RECORD } from '../constants'
import { unixDateConverter } from '../helper'
import { NoteType } from '../enums'
import NoteItemModel from '../models/noteItem'
import { Item } from 'react-native-paper/lib/typescript/src/components/List/List'

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
    let nextIndex = 0
    if (this.header.noteModel.items!.length > 0) {
      const indices = this.header.noteModel.items!.map((item: NoteItemModel) => item.rowIndex)
      nextIndex = Math.max(...indices) + 1
    }

    noteItemModel.rowIndex = nextIndex
    noteItemModel.noteId = this.header.noteModel.id
    this.unselectItems()
    noteItemModel.selected = true

    this.header.noteModel.items!.push(noteItemModel)
  }

  @action.bound selectItem(noteItemModel: NoteItemModel) {
    this.unselectItems()
    const target = this.header.noteModel.items!.find(item => item.rowIndex == noteItemModel.rowIndex)
    if (target) {
      target.selected = true
    }
  }

  @action.bound unselectItems() {
    for (let index = 0; index < this.header.noteModel.items!.length; index++) {
      this.header.noteModel.items![index].selected = false
    }
  }

  @action.bound removeSelectedItem() {
    const notSeletedItems = this.header.noteModel.items?.filter(item => !item.selected)
    if (notSeletedItems) {
      this.header.noteModel.items = notSeletedItems
    }
  }

  @action.bound checkedItem(noteItemModel: NoteItemModel, value: boolean) {
    this.header.noteModel.items?.slice()
    const target = this.header.noteModel.items!.find(item => item.rowIndex == noteItemModel.rowIndex)
    if (target) {
      target.checked = value
      this.refreshListItem()
    }
  }

  @action.bound refreshListItem() {
    this.header.noteModel.items = this.header.noteModel.items!.filter(_obj => true)
  }

  @action.bound async edit(model: NoteModel) {
    this.header.isEditing = true
    this.header.isNew = false

    if (model.type == NoteType.List) {
      var result = await this.noteItemService.getAll({
        order: 'rowIndex DESC',
        where: {
          noteId_eq: model.id,
        },
      })

      if (result.successful) {
        model.items = result.data.map((dataModel: any) => new NoteItemModel({ ...dataModel }))
      }
    }

    this.header.oldNoteModel = <NoteModel>{ ...model }
    this.header.noteModel = model
  }

  @action.bound add(model: NoteModel) {
    this.header.isEditing = true
    this.header.isNew = true

    if (model.type == NoteType.List) {
      model.items = <NoteItemModel[]>[]
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
    // console.log(all)
    if (all && all.data.length > 0) {
      let tempNotes = all.data.map((noteModel: any) => new NoteModel({ ...noteModel }))

      for (let index = 0; index < tempNotes.length; index++) {
        let note = tempNotes[index]
        if (note.type == NoteType.List) {
          var result = await this.noteItemService.getAll({
            limit: 3,
            page: 1,
            order: 'rowIndex DESC',
            where: {
              noteId_eq: note.id,
            },
          })

          if (result.successful) {
            note.items = result.data.map((noteItem: any) => new NoteItemModel({ ...noteItem }))
          }
        }
      }

      this.header.notes = tempNotes
    } else {
      this.header.notes = Array<NoteModel>()
    }

    this.header.loading = false
  }

  @action.bound async delete(noteModel: NoteModel) {
    if (this.header.loading) {
      return
    }

    this.header.loading = true

    const resultItems = await this.noteItemService.getAll({
      where: {
        noteId_eq: noteModel.id,
      },
    })

    if (resultItems.successful) {
      //delete if it has items
      if (resultItems && resultItems.data.length > 0) {
        resultItems.data.forEach(async (item: NoteItemModel) => await this.noteItemService.delete(item))
      }

      var result = await this.noteService.delete(<NoteModel>{ ...noteModel })
      if (result.successful) {
        this.header.loading = false
        this.header.isEditing = false
        this.header.isNew = false
        this.header.noteModel = <NoteModel>{}
        this.header.showAddOption = true

        if (result.successful) {
          return true
        }
      }
    }

    return false
  }

  @action.bound async save() {
    if (this.header.loading) {
      return
    }

    this.header.loading = true

    //make sure one of the field has value
    if (!this.header.noteModel.title) {
      this.header.noteModel.title = unixDateConverter(Date.now())
    } else {
      this.header.noteModel.title = this.header.noteModel.title.trim()
    }

    //New record
    const isNewRecord =
      this.header.noteModel.id === null || this.header.noteModel.id === 0 || this.header.noteModel.id === undefined
    if (isNewRecord) {
      this.header.noteModel.createDate = Date.now()
      this.header.noteModel.modifiedDate = Date.now()

      var result = await this.noteService.add(<NoteModel>{ ...this.header.noteModel })
      if (result.successful) {
        console.log('New Note successful', result)

        if (this.header.noteModel.type == NoteType.List) {
          this.header.noteModel.items?.forEach(async item => {
            await this.noteItemService.add(<NoteItemModel>{
              noteId: result.data.id,
              rowIndex: item.rowIndex,
              checked: item.checked,
              title: item.title,
              createDate: Date.now(),
              modifiedDate: Date.now(),
            })
          })

          console.log('New items successful')
        }
      }

      //Update record
    } else {
      if (
        this.header.noteModel.title === this.header.oldNoteModel.title &&
        this.header.noteModel.content === this.header.oldNoteModel.content &&
        this.header.noteModel.rank === this.header.oldNoteModel.rank &&
        this.header.noteModel.type == NoteType.Note
      ) {
        this.header.isEditing = false
        this.header.loading = false
        return
      }

      this.header.noteModel.modifiedDate = Date.now()
      var result = await this.noteService.update(<NoteModel>{ ...this.header.noteModel })
      if (result.successful) {
        console.log(this.header.noteModel.id)

        if (this.header.noteModel.type == NoteType.List) {
          //delete the items already exists
          const result = await this.noteItemService.getAll({
            where: {
              noteId_eq: this.header.noteModel.id,
            },
          })

          if (result.successful) {
            if (result.data && result.data.length > 0) {
              result.data.forEach(async (item: NoteItemModel) => {
                await this.noteItemService.delete(item)
              })
            }

            this.header.noteModel.items?.forEach(async item => {
              await this.noteItemService.add(<NoteItemModel>{
                noteId: this.header.noteModel.id,
                rowIndex: item.rowIndex,
                checked: item.checked,
                title: item.title,
                createDate: Date.now(),
                modifiedDate: Date.now(),
              })
            })
          }
        }
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
