import 'reflect-metadata'
import { Container } from 'inversify'
import { INoteService, INoteRepository, INoteItemService, INoteItemRepository } from '../interfaces/contracts'
import NoteService from '../services/noteService'
import NoteModel from '../models/note'
import NoteRepository from '../dataLayer/repositories/NoteRepository'
import getDecorators from 'inversify-inject-decorators'
import DatabaseLayer from '../dataLayer/DatabaseLayer'
import { DIName } from '../constants'
import NoteItemService from '../services/noteItemService'
import NoteItemModel from '../models/noteItem'
import NoteItemRepository from '../dataLayer/repositories/NoteItemRepository'

const container = new Container()
container
  .bind<INoteRepository>(DIName.NoteRepository)
  .toConstantValue(
    new NoteRepository(
      new DatabaseLayer(NoteRepository.database, NoteRepository.tableName, NoteRepository.columnMapping)
    )
  )

container
  .bind<INoteItemRepository>(DIName.NoteItemRepository)
  .toConstantValue(
    new NoteItemRepository(
      new DatabaseLayer(NoteItemRepository.database, NoteItemRepository.tableName, NoteItemRepository.columnMapping)
    )
  )

// container
//   .bind<IRepository>(DIName.Repository)
//   .toConstantValue(
//     new Repository(new DatabaseLayer(NoteRepository.database, NoteRepository.tableName, NoteRepository.columnMapping))
//   )

container.bind<INoteService<NoteModel>>(DIName.NoteService).to(NoteService)
container.bind<INoteItemService<NoteItemModel>>(DIName.NoteItemService).to(NoteItemService)

let decorators = getDecorators(container)
let { lazyInject, lazyInjectTagged } = decorators
export { container, lazyInjectTagged, lazyInject }
