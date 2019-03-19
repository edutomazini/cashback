
const spotify = require('../modules/spotify')
const db = require('../../config/database')

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).send({ erro: 'Token nao foi informado.' })

    // valida o usuario
    const usuario = await spotify.usuario(authHeader)

    // se nao existe no banco grava o novo usuario
    console.log('usuario ' + usuario.display_name === null ? usuario.email.split('@')[0]: usuario.display_name)
    console.log('email ' + usuario.email)

    let usuarios = await db('clientes').where('email', usuario.email)
    if (usuarios.length === 0) {
      console.log('inserindo')
      await db('clientes').insert({
        nome: usuario.display_name === null ? usuario.email.split('@')[0]: usuario.display_name,
        email: usuario.email,
      })
    }

    // retornando informacoes de usuario
    usuarios = await db('clientes').where('email', usuario.email).first()
    req.usuarioNome = usuario.display_name
    req.usuarioEmail = usuario.email
    req.usuarioId = usuarios.id

    next()

  } catch (err) {
    console.log(err)
    res.status(401).json({
      status: 401,
      message: 'UNAUTHORIZED'
    })
  }
}