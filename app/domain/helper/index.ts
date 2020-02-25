import { container } from '../di'
import { IRepository } from '../interfaces/contracts'
import { DIName } from '../constants'

export const truncate = (value: string, len = 30, target = 100) => {
  if (!value) {
    return value
  }

  value = value.replace(/\n/g, ' ')
  return value.length >= len ? value.substring(0, target) + '...' : value
}

export const unixDateTimeConverter = (ts: number) => {
  let dt = new Date(ts)
  return dt.toDateString()
}

export const unixDateConverter = (ts: number) => {
  let dt = new Date(ts)
  return dt.toDateString()
}

export const resetDb = async () => {
  var repo = container.get<IRepository>(DIName.NoteRepository)
  await repo.dropTable()

  repo = container.get<IRepository>(DIName.NoteItemRepository)
  await repo.dropTable()
}

export const query = async () => {
  var repo = container.get<IRepository>(DIName.NoteRepository)
  var result = await repo.query({})
  console.log(result)

  repo = container.get<IRepository>(DIName.NoteItemRepository)
  var result = await repo.query({})
  console.log(result)
}
