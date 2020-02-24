import Repository from './Repository'
import * as SQLite from 'expo-sqlite'
import { types } from '../DataTypes'
import DatabaseLayer from '../DatabaseLayer'
import { injectable } from 'inversify'
import { INoteItemRepository } from '../../../domain/interfaces/contracts'
import { DBName } from '../../../domain/constants'

@injectable()
export default class NoteItemRepository extends Repository implements INoteItemRepository {
  constructor(databaseLayer: DatabaseLayer) {
    super(databaseLayer)
  }

  static get database() {
    return SQLite.openDatabase(DBName)
  }

  static get tableName() {
    return 'noteItems'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      noteId: { type: types.INTEGER, not_null: true },
      title: { type: types.TEXT, not_null: true },
      checked: { type: types.BOOLEAN, default: () => false },
      rowIndex: { type: types.NUMERIC, default: () => 0 },
      createDate: { type: types.INTEGER, default: () => Date.now() },
      modifiedDate: { type: types.INTEGER, default: () => Date.now() },
    }
  }
}
