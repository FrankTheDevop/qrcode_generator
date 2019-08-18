'use strict'

const Promise = require('bluebird')
const qr = require('qr-image')
const fs = require('fs')
const path = require('path')

const logger = require('../../server/modules/getLogger')('models/system.js')
const helper = require('../../server/modules/helper')

module.exports = function (System) {

  System.generateQrCode = (email, token) => {
    const qrPng = qr.imageSync(`${email}|${token}`)
    const fileName = path.join(__dirname, `../../public/${email}|${token}.png`)
    fs.writeFileSync(fileName, qrPng, (err => {
      if (err) {
        console.error(err)
      }
    }))
    return Promise.resolve(fileName)
  }
}
