import Repository from './Repository'
import * as SQLite from 'expo-sqlite'
import { types } from '../DataTypes'
import DatabaseLayer from '../DatabaseLayer'
import { INoteRepository } from 'app/domain/interfaces/contracts'
import { injectable } from 'inversify'

@injectable()
export default class NoteRepository extends Repository implements INoteRepository {
  constructor(databaseLayer: DatabaseLayer) {
    super(databaseLayer)
  }

  static get database() {
    return SQLite.openDatabase('starnote.db')
  }

  static get tableName() {
    return 'note'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      title: { type: types.TEXT, not_null: true },
      content: { type: types.TEXT },
      type: { type: types.NUMERIC, default: () => 0 },
      deleted: { type: types.BOOLEAN, default: () => false },
      timestamp: { type: types.INTEGER, default: () => Date.now() },
    }
  }
}
