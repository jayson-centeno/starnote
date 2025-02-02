export const customTypes = { JSON: 'TEXT' }

/* Creates a string with the columns to create a table like:
 *  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER
 */
export function _createTableColumns(columnMapping: any = null) {
  return Object.entries(columnMapping)
    .map((i: any) => {
      const type = i[1].type
      const parts = [i[0], type]
      if (i[1].primary_key) {
        parts.push('NOT NULL PRIMARY KEY AUTOINCREMENT')
      } else {
        if (i[1].unique) parts.push('UNIQUE')
        if (i[1].not_null) parts.push('NOT NULL')
      }
      return parts.join(' ')
    })
    .join(', ')
}

// Creates the "CREATE TABLE" sql statement
export function createTable(tableName: string, columnMapping: any) {
  const columns = _createTableColumns(columnMapping)
  return `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`
}

// Creates the "DROP TABLE" sql statement
export function dropTable(tableName: string) {
  return `DROP TABLE IF EXISTS ${tableName};`
}

export default { createTable, dropTable }
