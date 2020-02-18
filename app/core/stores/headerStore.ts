import { observable } from 'mobx'

const defaults = {
  loading: false,
  errors: null,
  showCalc: false,
  Table: {
    data: [],
    loading: false,
    errors: null,
    totalRecordCount: 0,
  },
}

class HeaderStore {
  @observable header = defaults
}

export default new HeaderStore()
