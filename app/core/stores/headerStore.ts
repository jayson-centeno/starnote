import { observable } from 'mobx'
import { NoteType } from '../enums/appEnum'

const defaults = {
  loading: false,
  errors: null,
  showCalc: false,
  edit: false,
  type: NoteType.Note,
  title: '',
}

export class HeaderStore {
  @observable header = defaults
}

export default new HeaderStore()
