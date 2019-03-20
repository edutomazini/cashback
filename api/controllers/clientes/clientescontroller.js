const express = require('express')
const db = require('../../../config/database')
const auth = require('../../middlewares/auth')
const moment = require('moment')
const { asyncForEach } = require('../../utils/asyncUtils')

const router = express.Router()
router.get('/', auth, async (req, res) => {
  const id = req.usuarioId

  try {
    const clientes = await db('clientes').where('id', id)

    return res.send(clientes)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar consulta.' })
  }
})

router.post('/', auth, async (req, res) => {
  const usuarioTipo = req.usuarioTipo

  // apenas usuarios do spotify podem cadastrar
  if (usuarioTipo !== 'spotify') {
    return res.status(401).send({ erro: 'Nao autorizado a cadastrar.' })
  }

  try {
    await db('clientes').insert(req.body)
    return res.status(200).send({ status: 'Cadastro Efetuado com sucesso' })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar cadastro.' })
  }
})

router.post('/pedido', auth, async (req, res) => {
  const discos = req.body
  const usuarioId = req.usuarioId
  let regDisco
  let regCash
  let cashAlbum
  let valorCashTotal = 0
  let valorTotal = 0

  try {
    // verificando se todos os discos existem
    await asyncForEach(discos.albums, async (disco) => {
      regDisco = await db('albums').where('id', disco.id)
      if (regDisco.length === 0) {
        return res.status(404).send({ erro: 'Album: ' + disco.id + ' nao encontrado.' })
      }
    })

    // criando o pedido
    const idPedido = await db('clientepedidos').insert({
      cliente_id: usuarioId
    }).returning('id')

    // calculando cashback
    const semana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']
    const diasemana = moment().day()

    await asyncForEach(discos.albums, async (disco) => {
      regDisco = await db('albums').where('id', disco.id).first()
      regCash = await db('cashback').where('diasemana', semana[diasemana]).andWhere('genero', regDisco.genero).first()
      cashAlbum = regDisco.preco * (regCash.cash / 100)

      // somando os valores de cashback para ao final atualizar o pedido
      valorCashTotal = valorCashTotal + cashAlbum
      valorTotal = valorTotal + regDisco.preco

      // inserindo o album com o pedido e seu cashback calculado
      await db('itenspedido').insert({
        pedido_id: idPedido,
        album_id: regDisco.id,
        valor_album: regDisco.preco,
        cashback_album: cashAlbum
      })
    })

    // atualizando pedido
    await db('clientepedidos').update({
      valor: valorTotal,
      cashback: valorCashTotal.toFixed(2)
    }).where('id', idPedido)

    return res.status(200).send({ status: 'pedido Efetuado com sucesso', numero: idPedido[0], valor: valorTotal, cashback: valorCashTotal.toFixed(2) })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar pedido.' })
  }
})

// seguindo a logica da 'autenticacao' mencionada no read.me faria sentido apenas usuarios do spotify poderem ver todos os pedidos.
// mas para efeito didatico deixarei que todos listem os pedidos

router.get('/pedido', auth, async (req, res) => {
  const { idpedido, pagina, limit, campoordem, tipoordem } = req.query

  const tipoOrdem = tipoordem || 'desc'
  const campoOrdem = campoordem || 'idPedido'
  const to = Number(pagina) || 1
  const perPage = Number(limit) || 50
  const idPedido = idpedido || ''

  let regPedidos
  let whereraw

  try {
    if (idPedido !== '') {
      whereraw = 'clientepedidos.id = ' + idPedido
    } else {
      whereraw = '1 = 1'
    }

    regPedidos = await db.select(
      'clientepedidos.id as idPedido',
      'clientepedidos.valor',
      'clientepedidos.cashback as cashbackPedido',
      'clientepedidos.created_at as dataPedido',
      'clientes.id as idCliente',
      'clientes.nome as nomeCliente').from('clientepedidos')
      .innerJoin('clientes', 'clientes.id', 'clientepedidos.cliente_id')
      .whereRaw(whereraw)
      .orderBy(campoOrdem, tipoOrdem)
      .paginate((perPage > 100 ? 100 : perPage), to, true)

    await asyncForEach(regPedidos.data, async (pedido) => {
      pedido.albums = await db.select('albums.nome as nomeAlbum',
        'albums.genero',
        'itenspedido.valor_album as valorAlbum',
        'itenspedido.cashback_album as cashbackAlbum').from('albums')
        .innerJoin('itenspedido', 'itenspedido.album_id', 'albums.id').where('itenspedido.pedido_id', pedido.idPedido)
    })

    return res.send(regPedidos)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ erro: 'Falha ao efetuar cadastro.' })
  }
})

module.exports = app => app.use('/api/v1/clientes', router)
