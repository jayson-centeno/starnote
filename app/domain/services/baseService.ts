import { ICrudService, IResult, IRepository, IResultNoReturn } from '../interfaces/contracts'
import { injectable } from 'inversify'

@injectable()
export default class BaseService<T> implements ICrudService<T> {
  repository: IRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }

  public async add(model: T): Promise<IResult<T>> {
    try {
      let result = await this.repository.insert({ ...model })
      return <IResult<T>>{
        successful: true,
        error: null,
        data: result,
      }
    } catch (e) {
      return <IResult<T>>{
        successful: false,
        error: e,
      }
    }
  }

  public async update(model: T): Promise<IResult<T>> {
    try {
      let result = await this.repository.update({ ...model })
      return <IResult<T>>{
        successful: true,
        error: null,
        data: result,
      }
    } catch (e) {
      return <IResult<T>>{
        successful: false,
        error: e,
      }
    }
  }

  public async delete(model: T): Promise<IResultNoReturn> {
    await this.repository.destroy(model)
    return <IResultNoReturn>{
      successful: true,
      error: null,
    }
  }

  public async deleteById(id: any): Promise<IResultNoReturn> {
    await this.repository.destroy(id)
    return <IResultNoReturn>{
      successful: true,
      error: null,
    }
  }

  public async get(id: number): Promise<IResult<T>> {
    let result = await this.repository.find(id)
    return <IResult<T>>{
      successful: true,
      error: null,
      data: result,
    }
  }

  public async getAll(options: any = {}): Promise<IResult<T>> {
    let result = await this.repository.query(options)
    return <IResult<T>>{
      successful: true,
      error: null,
      data: result,
    }
  }

  public async dropTable(): Promise<IResultNoReturn> {
    await this.repository.dropTable()
    return <IResultNoReturn>{
      successful: true,
      error: null,
    }
  }
}
