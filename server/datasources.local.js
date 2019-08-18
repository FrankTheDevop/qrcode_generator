'use strict'
const config = require('config')

const datasources = {}

const log = (...msg) => console.log('[datasources]', ...msg)

if (config.has('api.dataSources') && config.has('api.dataSources.mysqldb') && config.has('api.dataSources.mysqldb.url')) {
  log('Data sources: Using MySQL config', config.get('api.dataSources.mysqldb.url'))
  datasources.db = {
    name: 'db',
    url: config.get('api.dataSources.mysqldb.url'),
    connector: 'mysql',
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  }
}

module.exports = datasources
