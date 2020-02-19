import DatabaseLayer from '../DatabaseLayer'
import { IRepository } from 'app/core/interfaces/appInterface'
import { injectable } from 'inversify'

@injectable()
export default class Repository implements IRepository {
  public databaseLayer: DatabaseLayer

  constructor(databaseLayer: DatabaseLayer) {
    this.databaseLayer = databaseLayer
  }

  async createTable() {
    return await this.databaseLayer.createTable()
  }

  async dropTable() {
    return await this.databaseLayer.dropTable()
  }

  async insert(_obj: any) {
    return await this.databaseLayer.insert(_obj).then(
      (res: any) => res,
      error => {
        console.log(error)
      }
    )
  }

  async update(_obj: any) {
    return await this.databaseLayer.update(_obj)
  }

  async destroy({ id }: any) {
    return await this.databaseLayer.destroy(id)
  }

  async destroyAll() {
    return await this.databaseLayer.destroyAll()
  }

  async find(id: any) {
    return await this.databaseLayer.find(id).then((res: any) => res)
  }

  async findBy(where = {}) {
    return await this.databaseLayer.findBy(where).then((res: any) => res)
  }

  async query(options = {}) {
    return await this.databaseLayer.query(options).then((res: any[]) => res)
  }
}
