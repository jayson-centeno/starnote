import QueryBuilder from './query_builder'
import DataTypes from './DataTypes'

export default class DatabaseLayer {
  database: any
  tableName: string
  columnMapping: any

  constructor(database: any, tableName: string, columnMapping: any) {
    this.database = database
    this.tableName = tableName
    this.columnMapping = columnMapping

    this.createTable()
  }

  async executeBulkSql(sqls: any, params: any = []): Promise<any> {
    const database = this.database

    return await new Promise((txResolve, txReject) => {
      database.transaction((tx: any) => {
        Promise.all(
          sqls.map((sql: string, index: number) => {
            return new Promise((sqlResolve, sqlReject) => {
              tx.executeSql(
                sql,
                params[index],
                (_: any, { rows, insertId }: any) => {
                  sqlResolve({ rows: rows._array, insertId })
                },
                (_: any, error: any) => {
                  sqlReject(error)
                }
              )
            })
          })
        )
          .then(txResolve)
          .catch(txReject)
      })
    })
  }

  async executeSql(sql: string, params: any = {}): Promise<any> {
    return await this.executeBulkSql([sql], [params])
      .then((res: any) => res[0])
      .catch((errors: any[]) => {
        console.log('executeSql error', errors)
      })
  }

  async createTable(): Promise<any> {
    console.log('Try create table', this.tableName)
    const sql = QueryBuilder.createTable(this.tableName, this.columnMapping)
    return await this.executeSql(sql).then(
      () => true,
      error => {
        console.log('createTable', error)
      }
    )
  }

  async dropTable(): Promise<any> {
    const sql = QueryBuilder.dropTable(this.tableName)
    return await this.executeSql(sql).then(() => true)
  }

  async insert(obj: any): Promise<any> {
    const result = DataTypes.toDatabaseValue(this.columnMapping, this._sanitize(obj))
    const sql = QueryBuilder.insert(this.tableName, result)
    const params = Object.values(result)

    return await this.executeSql(sql, params).then(
      ({ insertId }) => {
        let output = this.find(insertId)
        return DataTypes.toModelValue(this.columnMapping, output)
      },
      error => {
        console.log(error)
      }
    )
  }

  async update(_obj: any): Promise<any> {
    const obj = DataTypes.toDatabaseValue(this.columnMapping, this._sanitize(_obj))
    const sql = QueryBuilder.update(this.tableName, obj)
    const { id, ...props } = obj
    const params = Object.values(props)
    return await this.executeSql(sql, [...params, id])
  }

  async bulkInsertOrReplace(objs: any[]): Promise<any> {
    const list = objs.reduce(
      (accumulator, obj) => {
        const params = Object.values(obj)
        accumulator.sqls.push(QueryBuilder.insertOrReplace(this.tableName, obj))
        accumulator.params.push(params)
        return accumulator
      },
      { sqls: [], params: [] }
    )
    return await this.executeBulkSql(list.sqls, list.params)
  }

  async destroy(id: any): Promise<any> {
    const sql = QueryBuilder.destroy(this.tableName)
    return await this.executeSql(sql, [id]).then(() => true)
  }

  async destroyAll(): Promise<any> {
    const sql = QueryBuilder.destroyAll(this.tableName)
    return this.executeSql(sql).then(() => true)
  }

  async find(id: any): Promise<any> {
    const sql = QueryBuilder.find(this.tableName)
    return await this.executeSql(sql, [id]).then(({ rows }) =>
      rows[0] ? DataTypes.toModelValue(this.columnMapping, rows[0]) : null
    )
  }

  async findBy(where = {}): Promise<any> {
    const options = { where, limit: 1 }
    const sql = QueryBuilder.query(this.tableName, options)
    const params = Object.values(options.where)
    return await this.executeSql(sql, params).then(({ rows }) =>
      rows[0] ? DataTypes.toModelValue(this.columnMapping, rows[0]) : null
    )
  }

  async query(options: any): Promise<any> {
    const sql = QueryBuilder.query(this.tableName, options)
    const params = Object.values(options.where || {})
    return await this.executeSql(sql, params).then(
      ({ rows }: any) => rows.map((p: any) => DataTypes.toModelValue(this.columnMapping, p)),
      error => {
        console.log('query - ' + sql, error)
      }
    )
  }

  _sanitize(obj: any) {
    const allowedKeys = Object.keys(this.columnMapping)
    return Object.keys(obj).reduce((ret, key) => (allowedKeys.includes(key) ? { ...ret, [key]: obj[key] } : ret), {})
  }
}
