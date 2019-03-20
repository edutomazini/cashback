
exports.up = function (knex, Promise) {
  return knex.schema.createTable('itenspedido', table => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.integer('pedido_id').unsigned()
    table.integer('album_id').unsigned()
    table.decimal('valor_album', 8, 2)
    table.decimal('cashback_album', 5)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('itenspedido')
}
