const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../../../config/database')
const authConfig = process.env.AUTH_SECRET || 'secret'
const router = express.Router()

const gerarToken = (cliente_id) => {
  return jwt.sign({ cliente_id }, authConfig, {
    expiresIn: 86400
  })
}

router.post('/login', async (req, res) => {
  const { email, senha } = req.body
  try {
    if (email === '' || email === null || senha === '' || senha === null) {
      return res.status(401).send({ erro: 'Falha ao localizar cadastro.' })
    }
    
    const clientes = await db('clientes').where('email', email).andWhere('senha', senha).first()

    if (!clientes.length === 0) {
      return res.status(401).send({ erro: 'cliente não existe! ' })
    }

    const token = gerarToken(clientes.id)
    res.send({ clientes, token })
  } catch (error) {
    console.log(error)
    return res.status(401).send({ erro: 'Falha ao localizar cadastro.' })
  }
})

module.exports = app => app.use('/api/v1/clientes', router)
