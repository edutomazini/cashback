const jwt = require('jsonwebtoken')
const authConfig = process.env.AUTH_SECRET || 'secret'
const spotify = require('../modules/spotify')
const db = require('../../config/database')

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({ erro: 'Token nao foi informado.' })
    }

    // valida o usuario primeiro com o bearer de cliente
    const parts = authHeader.split(' ')
    const [type, token] = parts

    var usuarioTipo = 'spotify'

    jwt.verify(token, authConfig, (error, decoded) => {
      if (!error) {
        usuarioTipo = 'cliente'
        console.log('cliente logando')
        req.usuarioId = decoded.cliente_id
        req.usuarioTipo = usuarioTipo
        next()
      }
    })

    // se nao conseguiu validar o token acima, tenta validar pelo spotify
    // valida o usuario no spotify
    if (usuarioTipo === 'spotify') {
      console.log('spotify logando')
      const usuario = await spotify.usuario(authHeader)

      // se nao existe no banco grava o novo usuario
      let usuarios = await db('clientes').where('email', usuario.email)
      if (usuarios.length === 0) {
        console.log('inserindo')
        await db('clientes').insert({
          nome: usuario.display_name === null ? usuario.email.split('@')[0] : usuario.display_name,
          email: usuario.email
        })
      }

      // retornando informacoes de usuario
      usuarios = await db('clientes').where('email', usuario.email).first()
      req.usuarioNome = usuario.display_name
      req.usuarioEmail = usuario.email
      req.usuarioId = usuarios.id
      req.usuarioTipo = usuarioTipo

      next()
    }
  } catch (err) {
    console.log(err)
    res.status(401).json({
      status: 401,
      message: 'UNAUTHORIZED'
    })
  }
}
