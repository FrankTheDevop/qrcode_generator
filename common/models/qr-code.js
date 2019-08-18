'use strict'
const Promise = require('bluebird')
const qr = require('qr-image')
const fs = require('fs')
const promisifiedReadFile = Promise.promisify(fs.readFile);

const path = require('path')
const logger = require('../../server/modules/getLogger')('models/qr-code.js')
const helper = require('../../server/modules/helper')

module.exports = function (QRCode) {
  QRCode.generatePublicPath = async (email, token) => {
    const fileName = await QRCode.generateFileName(email, token)
    return `/${fileName}.png`
  }

  QRCode.generatePath = async (email, token) => {
    const fileName = await QRCode.generateFileName(email, token)
    return path.join(__dirname, `../../public/${fileName}.png`)
  }

  // Looks duplicate because currently the definition of the filename
  // and data is not specified. Probably will differ from generateData
  // later
  QRCode.generateFileName = (email, token) => {
    return Promise.resolve(`${email}|${token}`)
  }

  QRCode.generateData = (email, token) => {
    return Promise.resolve(`${email}|${token}`)
  }

  QRCode.generate = async (email, token) => {
    const data = await QRCode.generateData(email, token)
    const qrPng = qr.imageSync(data)

    const fileName = await QRCode.generatePath(email, token)

    fs.writeFileSync(fileName, qrPng, (err => {
      if (err) {
        console.error(err)
      }
    }))

    return Promise.resolve(fileName)
  }

  QRCode.existsAlready = async (email, token) => {
    const myPath = await QRCode.generatePath(email, token)

    return await helper.fileAvailable(myPath)
  }

  QRCode.saveIt = async (email, token) => {
    const data = {
      email,
      token,
    }

    return QRCode.create(data)
  }

  QRCode.findByEmail = (email) => {
    const conditions = {
      where: {
        email,
      },
    }

    return QRCode.findOne(conditions)
  }

  QRCode.getFile = async (email, token) => {
    const myPath = await QRCode.generatePath(email, token)

    console.log(`myPath: ${myPath}`)
    const data = await promisifiedReadFile(myPath)
    console.log('data:', data)
    return Promise.resolve(data)
  }

  QRCode.getPublicPathByEmail = async (email) => {
    const entry = await QRCode.findByEmail(email)

    return QRCode.generatePublicPath(entry.email, entry.token)
  }
}
