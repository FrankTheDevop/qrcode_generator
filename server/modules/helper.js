'use strict'
const fs = require('fs')
const path = require('path')

const logger = require('./getLogger')('modules/helper.js')
const moment = require('moment')

module.exports.checkPayload = (payload) => {
  logger.debug('payload:', payload)
  try {
    payload = JSON.parse(payload)
  } catch (e) {
  }

  return payload
}

module.exports.doWeNeedToGetTheEntry = (entry) => (entry === null || entry === undefined)

module.exports.fileAvailable = (url) => {
  if (fs.existsSync(url)) {
    return Promise.resolve(true)
  }

  return Promise.resolve(false)
}

module.exports.validValue = (value) => {
  return !(value === null || value === undefined)
}
