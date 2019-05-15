const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb')
const PostgreSQL = require('./db/strategies/postgresql')

const contextMongodb = new ContextStrategy(new MongoDB())
contextMongodb.create() //O item foi salvo em MongoDB

const contextPostgresql = new ContextStrategy(new PostgreSQL())
contextPostgresql.create() //O item foi salvo em PostgreSQL