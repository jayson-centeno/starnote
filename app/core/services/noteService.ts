import NoteRepository from '../dataLayer/repositories/NoteRepository'
import { INoteService, IResult, IResultNoReturn } from '../interfaces/appInterface'

export default class NoteService implements INoteService {
  repository: NoteRepository

  constructor() {
    this.repository = new NoteRepository()
  }

  async Add<NoteModel>(model: NoteModel): Promise<IResult<NoteModel>> {
    try {
      let result = await this.repository.insert({ ...model })
      return <IResult<NoteModel>>{
        successful: true,
        error: null,
        data: <NoteModel>{},
        otherData: result,
      }
    } catch (e) {
      return <IResult<NoteModel>>{
        successful: false,
        error: e,
      }
    }
  }

  async Update<NoteModel>(model: NoteModel): Promise<IResult<NoteModel>> {
    throw new Error('Method not implemented.')
  }

  async Delete<NoteModel>(model: NoteModel): Promise<IResultNoReturn> {
    let result = await this.repository.dropTable()

    return <IResultNoReturn>{
      successful: true,
      error: null,
      otherData: result,
    }
  }

  async Get<NoteModel>(id: number): Promise<IResult<NoteModel>> {
    throw new Error('Method not implemented.')
  }

  async GetAll<NoteModel>(options: any = {}): Promise<IResult<NoteModel>> {
    let result = await this.repository.query(options)
    return <IResult<NoteModel>>{
      successful: true,
      error: null,
      data: [<NoteModel>{}],
      otherData: result,
    }
  }
}
