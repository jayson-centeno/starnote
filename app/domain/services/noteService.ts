import NoteModel from '../models/note'
import BaseService from './baseService'
import { INoteService, INoteRepository } from '../interfaces/contracts'
import { injectable, inject } from 'inversify'

@injectable()
export default class NoteService extends BaseService<NoteModel> implements INoteService<NoteModel> {
  constructor(@inject('INoteRepository') public readonly noteRepository: INoteRepository) {
    super(noteRepository)
  }
}
