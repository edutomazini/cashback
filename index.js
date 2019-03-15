const express = require('express')
const path = require('path');

const app = express()

require('./api/controllers/clientes/index')(app)

app.use('/dev', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('localhost:' + port);
});