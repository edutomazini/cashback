const compression = require('compression')
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = app => {
  app.use(compression())
  app.use(cors())
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
}
