const express = require('express')
const path = require('path')
var cors = require('cors')
var cookieParser = require('cookie-parser')

const app = express()

require('./api/middlewares')(app)
require('./api/controllers/clientes/index')(app)
require('./api/controllers/spotify/index')(app)

app.use('/', express.static(path.join(__dirname, 'public')))
  .use(cors())
  .use(cookieParser())

var port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('localhost:' + port)
})
