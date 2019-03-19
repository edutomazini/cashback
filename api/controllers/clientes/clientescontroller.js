const express = require('express')
const db = require('../../../config/database')
const spotify = require('../../modules/spotify')

const router = express.Router()
router.get('/', async (req, res) => {
  // const id = req.cliente_id

  try {
    let clientes = await db('clientes')

    return res.send(clientes)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' })
  }
})

router.get('/albums', async (req, res) => {
  try {
    let albums = await spotify.retTitulos()
    return res.send(albums)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' })
  }
})

module.exports = app => app.use('/api/v1/clientes', router)
