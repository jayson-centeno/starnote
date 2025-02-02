export const types = {
  INTEGER: 'INTEGER',
  FLOAT: 'FLOAT',
  TEXT: 'TEXT',
  NUMERIC: 'NUMERIC',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  BOOLEAN: 'BOOLEAN',
  JSON: 'JSON',
}

function toDatabaseValue(columnMapping: any, resource: any) {
  return Object.entries(resource).reduce((o: any, p: any) => {
    o[p[0]] = propertyToDatabaseValue(columnMapping[p[0]].type, p[1])
    return o
  }, {})
}

function propertyToDatabaseValue(type: any, value: unknown) {
  switch (type) {
    case types.JSON:
      return JSON.stringify(value)
    case types.BOOLEAN:
      return value ? 1 : 0
    default:
      return value
  }
}

function toModelValue(columnMapping: any, obj: any) {
  return Object.entries(columnMapping).reduce((o: any, p: any) => {
    if (obj.hasOwnProperty(p[0])) {
      o[p[0]] = propertyToModelValue(p[1].type, obj[p[0]])
    }
    return o
  }, {})
}

function propertyToModelValue(type: any, value: any) {
  switch (type) {
    case types.JSON:
      return JSON.parse(value || null)
    case types.BOOLEAN:
      return Boolean(value)
    default:
      return value
  }
}

export default {
  toDatabaseValue,
  propertyToDatabaseValue,
  toModelValue,
  propertyToModelValue,
}
