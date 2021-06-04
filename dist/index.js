
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./pix-utils.cjs.production.min.js')
} else {
  module.exports = require('./pix-utils.cjs.development.js')
}
