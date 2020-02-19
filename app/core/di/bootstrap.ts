import { Container } from 'inversify'
import 'reflect-metadata'
import { INoteService, INoteRepository, IRepository } from '../interfaces/appInterface'
import NoteService from '../services/noteService'
import NoteModel from '../models/note'
import NoteRepository from '../dataLayer/repositories/NoteRepository'
import getDecorators from 'inversify-inject-decorators'
import Repository from '../dataLayer/repositories/Repository'
import DatabaseLayer from '../dataLayer/DatabaseLayer'

const container = new Container()
container
  .bind<INoteRepository>('INoteRepository')
  .toConstantValue(
    new NoteRepository(
      new DatabaseLayer(NoteRepository.database, NoteRepository.tableName, NoteRepository.columnMapping)
    )
  )

container
  .bind<IRepository>('IRepository')
  .to(Repository)
  .inSingletonScope()

container.bind<INoteService<NoteModel>>('INoteService').to(NoteService)

let decorators = getDecorators(container)
let { lazyInject, lazyInjectTagged } = decorators
export { container, lazyInjectTagged, lazyInject }
