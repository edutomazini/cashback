exports.up = function (knex, Promise) {
  return knex.schema.alterTable('itenspedido', function (table) {
    table.index('album_id', 'idxalbum_id')
    table.index('pedido_id', 'idxpedido_id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('itenspedido', function (table) {
    table.dropIndex('album_id', 'idxalbum_id')
    table.dropIndex('pedido_id', 'idxpedido_id')
  })
}
