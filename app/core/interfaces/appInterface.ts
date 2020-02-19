export interface IResult<T> {
  successful: boolean
  error: any
  data: T | T[]
  otherData: any
}

export interface IResultNoReturn {
  successful: boolean
  error: any
  otherData: any
}

export interface ICrudService<T> {
  Add(model: T): Promise<IResult<T>>
  Update(model: T): Promise<IResult<T>>
  Delete(model: T): Promise<IResultNoReturn>
  DeleteById(id: any): Promise<IResultNoReturn>
  Get(id: number): Promise<IResult<T>>
  GetAll(): Promise<IResult<T>>
}

export interface INoteService<T> extends ICrudService<T> {}

export interface INoteRepository extends IRepository {}

export interface IRepository {
  createTable(): any
  dropTable(): any
  insert(_obj: any): any
  update(_obj: any): any
  destroy({ id }: any): any
  destroyAll(): any
  find(id: any): any
  findBy(where: any): any
  query(options: any): any
}
