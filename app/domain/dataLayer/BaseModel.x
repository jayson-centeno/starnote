import SQLite, { WebSQLDatabase } from 'expo-sqlite'
import Repository from './Repository'

const isFunction = (p: any) => Object.prototype.toString.call(p) === '[object Function]'

export default class BaseModel {
  columnMapping: any
  _tableName: string
  id: string

  constructor(obj = {}) {
    this.setProperties(obj)
  }

  setProperties(props: any) {
    const cm = this.columnMapping
    Object.keys(cm).forEach((k: string) => {
      if (props[k] !== undefined) {
        this[k] = props[k]
      } else if (isFunction(cm[k].default)) {
        this[k] = cm[k].default()
      } else {
        this[k] = null
      }
    })
    return this
  }

  get database(): WebSQLDatabase {
    return SQLite.openDatabase('starnote.db')
  }

  get tableName(): string {
    return this.tableName
  }

  set tableName(value: string) {
    this._tableName = value
  }

  get repository() {
    return new Repository(this.database, this.tableName, this.columnMapping)
  }

  createTable() {
    return this.repository.createTable()
  }

  dropTable() {
    return this.repository.dropTable()
  }

  create(obj: any) {
    return this.repository.insert(obj).then((res: any) => new this(res))
  }

  update(obj: any) {
    return this.repository.update(obj).then((res: any) => new this(res))
  }

  save() {
    if (this.id) {
      return this.constructor.repository.update(this).then((res: any) => this.setProperties(res))
    } else {
      return this.constructor.repository.insert(this).then((res: any) => this.setProperties(res))
    }
  }

  destroy() {
    return this.constructor.repository.destroy(this.id)
  }

  destroy(id: any) {
    return this.repository.destroy(id)
  }

  destroyAll() {
    return this.repository.destroyAll()
  }

  find(id: any) {
    return this.repository.find(id).then(res => (res ? new this(res) : res))
  }

  findBy(where: any) {
    return this.repository.findBy(where).then(res => (res ? new this(res) : res))
  }

  /**
   * @param {columns: '*', page: 1, limit: 30, where: {}, order: 'id DESC'} options
   */
  query(options: any) {
    return this.repository.query(options)
  }
}
