const express = require('express')
const router = express.Router()
const spot = require('../../modules/spotify')

router.get('/search', async function (req, res) {
  try {
    const { genre, offset } = req.query
    const Authorization = req.headers.authorization
    const data = await spot.search(genre, offset, Authorization)
    res.send(data)
  } catch (error) {
    res.send({ erro: error })
  }
})

router.get('/genres', async function (req, res) {
  try {
    const Authorization = req.headers.authorization
    const data = await spot.genres(Authorization)
    res.send(data)
  } catch (error) {
    res.send({ erro: error })
  }
})

module.exports = app => app.use('/api/v1/spotify', router)
