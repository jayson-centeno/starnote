import { NoteType } from '../enums/appEnum'
import { INoteService } from '../interfaces/appInterface'
import NoteModel from '../models/note'
import { observable, action } from 'mobx'
import { container } from '../di/bootstrap'

const defaults = {
  loading: false,
  errors: null,
  showCalc: false,
  edit: false,
  type: NoteType.Note,
  title: '',
}

export class HeaderStore {
  private noteService = container.get<INoteService<NoteModel>>('INoteService')

  @observable header = defaults

  @action.bound public async getNotes() {
    var all = await this.noteService.GetAll()
    console.log(all)
  }
}

export default new HeaderStore()
