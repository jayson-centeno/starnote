// Creates the "Update" sql statement
export function update(tableName: any, object: any) {
  const { id, ...props } = object
  const values = Object.keys(props)
    .map(k => `${k} = ?`)
    .join(', ')

  return `UPDATE ${tableName} SET ${values} WHERE id = ?;`
}

export default { update }
