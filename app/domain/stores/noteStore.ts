import { INoteService, INoteItemService } from '../interfaces/contracts'
import NoteModel from '../models/note'
import { observable, action, computed } from 'mobx'
import { container } from '../di'
import { DIName, RECORD } from '../constants'
import { unixDateConverter } from '../helper'
import { NoteType, CardView } from '../enums'
import NoteItemModel from '../models/noteItem'

const defaults = {
  loading: false,
  errors: null,
  showCalc: false,
  isEditing: false,
  isNew: false,
  loaded: false,
  showAddOption: true,
  showDelete: false,
  oldNoteModel: <NoteModel>{},
  listEditMode: false,
  noteModel: <NoteModel>{},
  notes: Array<NoteModel>(),
  cardView: CardView.ListView,
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

  @action.bound resetIsNew() {
    this.header.isNew = false
  }

  @action.bound showDeleteDialog() {
    this.header.showDelete = true
  }

  @action.bound setCardView(cardView: CardView) {
    this.header.cardView = cardView
  }

  @action.bound clearModel() {
    this.header.noteModel = <NoteModel>{}
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

  @action.bound removeSelectedItem(item: NoteItemModel) {
    const notSeletedItems = this.header.noteModel.items?.filter(data => data.rowIndex != item.rowIndex)
    if (notSeletedItems) {
      this.header.noteModel.items = notSeletedItems
    }
  }

  @action.bound checkedItem(noteItemModel: NoteItemModel, value: boolean) {
    const target = this.header.noteModel.items!.find(item => item.rowIndex == noteItemModel.rowIndex)
    if (target) {
      target.checked = value
      this.refreshListItem()
    }
  }

  @action.bound refreshListItem() {
    this.header.noteModel.items = this.header.noteModel.items!.filter(_obj => true)
  }

  @action.bound async edit(model: NoteModel): Promise<boolean> {
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

    return true
  }

  @action.bound add(model: NoteModel) {
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

    console.log('load notes start', new Date().getSeconds())

    this.header.loading = true
    var all = await this.noteService.getAll({
      order: 'modifiedDate DESC',
      limit: 5,
      page: RECORD.defaultPage,
    })
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

    console.log('load notes end', new Date().getSeconds())

    this.header.loading = false
  }

  @action.bound removeNoteFromNotes(model: NoteModel) {
    const target = this.header.notes.findIndex(data => data.id == model.id)
    this.header.notes.splice(target, 1)
  }

  @action.bound async delete(noteModel: NoteModel) {
    if (this.header.loading) {
      return
    }

    this.header.loading = true

    if (noteModel.type == NoteType.List) {
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
      }
    }

    var result = await this.noteService.delete(<NoteModel>{ ...noteModel })
    if (result.successful) {
      this.header.loading = false
      this.header.isEditing = false
      this.header.isNew = false
      this.header.noteModel = <NoteModel>{}
      this.header.showAddOption = true

      if (result.successful) {
        this.removeNoteFromNotes(noteModel)
        return true
      }
    }

    return false
  }

  @action.bound async save() {
    if (this.header.loading) {
      return
    }

    if (!this.header.isEditing) {
      return
    }

    this.header.loading = true

    let tempModel = { ...this.header.noteModel }

    //make sure one of the field has value
    if (!this.header.noteModel.title) {
      tempModel.title = unixDateConverter(Date.now())
    } else {
      tempModel.title = this.header.noteModel.title.trim()
    }

    //New record
    const isNewRecord = !tempModel.id || tempModel.id === 0

    if (isNewRecord) {
      tempModel.createDate = Date.now()
      tempModel.modifiedDate = Date.now()

      var result = await this.noteService.add(<NoteModel>{ ...tempModel })
      if (result.successful) {
        tempModel.id = result.data.id
        if (tempModel.type == NoteType.List) {
          tempModel.items?.forEach(async item => {
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

      this.header.notes.push(tempModel)
      //update state
      this.header.noteModel = tempModel

      //Update record
    } else {
      if (
        tempModel.title === this.header.oldNoteModel.title &&
        tempModel.content === this.header.oldNoteModel.content &&
        tempModel.rank === this.header.oldNoteModel.rank &&
        tempModel.type == NoteType.Note
      ) {
        this.header.isEditing = false
        this.header.loading = false
        return
      }

      tempModel.modifiedDate = Date.now()
      var result = await this.noteService.update(<NoteModel>{ ...tempModel })
      if (result.successful) {
        if (tempModel.type == NoteType.List) {
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

            tempModel.items?.forEach(async item => {
              await this.noteItemService.add(<NoteItemModel>{
                noteId: tempModel.id,
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

      // this.header.noteModel = tempModel
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
