'use strict'
const bunyan = require('bunyan')

module.exports = function (name) {
  return bunyan.createLogger({
    name: name,
    src: true,
    serializers: {
      req: bunyan.stdSerializers.req,
      res: bunyan.stdSerializers.res,
    },
    streams: [
      {
        stream: process.stdout,
        level: 'info',
      },
      {
        path: 'qrcode_generator.log',
        level: 'debug',
      },
    ],
    level: 'debug',
  })
}
