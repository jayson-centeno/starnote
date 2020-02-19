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

export interface ICrudService {
  Add<T>(model: T): Promise<IResult<T>>
  Update<T>(model: T): Promise<IResult<T>>
  Delete<T>(model: T): Promise<IResultNoReturn>
  Get<T>(id: number): Promise<IResult<T>>
  GetAll<T>(): Promise<IResult<T>>
}

export interface INoteService extends ICrudService {}
