const express = require('express')
const db = require('../../../config/database')
const auth = require('../../middlewares/auth')

const router = express.Router()
router.get('/', auth, async (req, res) => {
  const { genero, pagina, limit, campoordem, tipoordem } = req.query

  const tipoOrdem = tipoordem || 'asc'
  const campoOrdem = campoordem || 'nome'
  const to = Number(pagina) || 1
  const per_page = Number(limit) || 50
  const genre = genero.replace(' ', '').split(',') || ['pop', 'rock', 'classical', 'mpb']

  try {
    const album = await db.select('*')
      .from('albums')
      .whereIn('genero', genre)
      .orderBy(campoOrdem, tipoOrdem)
      .paginate(per_page, to, true)

    return res.send(album)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const album = await db.select('*')
      .from('albums')
      .where('id', req.params.id).first()

    return res.send(album)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' })
  }
})

module.exports = app => app.use('/api/v1/albums', router)
