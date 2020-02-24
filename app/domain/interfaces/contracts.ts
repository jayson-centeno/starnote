export interface IResult<T> {
  successful: boolean
  error: any
  data: any
}

export interface IResultNoReturn {
  successful: boolean
  error: any
}

export interface ICrudService<T> {
  add(model: T): Promise<IResult<T>>
  update(model: T): Promise<IResult<T>>
  delete(model: T): Promise<IResultNoReturn>
  deleteById(id: any): Promise<IResultNoReturn>
  get(id: number): Promise<IResult<T>>
  getAll(options: IDefaultQueryOptions): Promise<IResult<T>>
  dropTable(): Promise<IResultNoReturn>
}

export interface INoteService<T> extends ICrudService<T> {}

export interface INoteItemService<T> extends ICrudService<T> {}

export interface INoteRepository extends IRepository {}

export interface INoteItemRepository extends IRepository {}

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

export interface IDefaultQueryOptions {
  columns?: string
  page?: any
  limit?: number
  where?: any
  order?: string
}
