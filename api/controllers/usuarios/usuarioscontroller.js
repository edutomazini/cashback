const express = require('express')
const db = require('../../../config/database')
const auth = require('../../middlewares/auth')

const router = express.Router()
router.get('/', auth, async (req, res) => {
  if (req.usuarioTipo !== 'spotify')
    return res.status(401).send({ status: 401, message: 'UNAUTHORIZED' })

  const id = req.usuarioId

  try {
    const clientes = await db('clientes').where('id', id)

    return res.send(clientes)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' })
  }
})

module.exports = app => app.use('/api/v1/usuarios', router)
