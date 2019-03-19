const express = require('express')
const db = require('../../../config/database')
const auth = require('../../middlewares/auth')

const router = express.Router()
router.get('/', auth, async (req, res) => {
   const id = req.usuarioId

  try {
    let clientes = await db('clientes').where('id', id)

    return res.send(clientes)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' })
  }
})



module.exports = app => app.use('/api/v1/clientes', router)
