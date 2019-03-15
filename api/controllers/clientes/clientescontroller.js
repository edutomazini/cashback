const express = require('express');
const db = require('../../../config/database')

const router = express.Router()
router.get('/', async (req, res) => {
    const id  = req.cliente_id

    try {
        let clientes = await db('clientes')
        
        return res.send(clientes);
    } catch (err) {
        console.log(err)
        return res.status(400).send({ erro: 'Falha ao efetuar consulta.' });
    }
})

module.exports = app => app.use('/api/clientes', router);