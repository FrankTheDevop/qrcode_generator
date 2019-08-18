'use strict'

const Promise = require('bluebird')
const qr = require('qr-image')
const fs = require('fs')
const path = require('path')

const logger = require('../../server/modules/getLogger')('models/system.js')
const helper = require('../../server/modules/helper')

module.exports = function (System) {

  System.generateQrCode = async (email, token) => {
    const QRCode = System.app.models.qr_code

    const exists = await QRCode.existsAlready(email, token)

    if (!exists) {
      await QRCode.generate(email, token)
    }

    return QRCode.generatePublicPath(email, token)
  }
}
