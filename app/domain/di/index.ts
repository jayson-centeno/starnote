import 'reflect-metadata'
import { Container } from 'inversify'
import { INoteService, INoteRepository, IRepository } from '../interfaces/contracts'
import NoteService from '../services/noteService'
import NoteModel from '../models/note'
import NoteRepository from '../dataLayer/repositories/NoteRepository'
import getDecorators from 'inversify-inject-decorators'
import Repository from '../dataLayer/repositories/Repository'
import DatabaseLayer from '../dataLayer/DatabaseLayer'
import { DIName } from '../constants'

const container = new Container()
container
  .bind<INoteRepository>(DIName.NoteRepository)
  .toConstantValue(
    new NoteRepository(
      new DatabaseLayer(NoteRepository.database, NoteRepository.tableName, NoteRepository.columnMapping)
    )
  )

container
  .bind<IRepository>(DIName.Repository)
  .toConstantValue(
    new Repository(new DatabaseLayer(NoteRepository.database, NoteRepository.tableName, NoteRepository.columnMapping))
  )

container.bind<INoteService<NoteModel>>(DIName.NoteService).to(NoteService)

let decorators = getDecorators(container)
let { lazyInject, lazyInjectTagged } = decorators
export { container, lazyInjectTagged, lazyInject }
