import BaseService from './baseService'
import { INoteItemService, INoteItemRepository } from '../interfaces/contracts'
import { injectable, inject } from 'inversify'
import NoteItemModel from '../models/noteItem'

@injectable()
export default class NoteItemService extends BaseService<NoteItemModel> implements INoteItemService<NoteItemModel> {
  constructor(@inject('INoteItemRepository') public readonly repository: INoteItemRepository) {
    super(repository)
  }
}
