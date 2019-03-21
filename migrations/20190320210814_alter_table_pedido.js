exports.up = function (knex, Promise) {
  return knex.schema.alterTable('clientepedidos', function (table) {
    table.index('created_at', 'idxDatacreated')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('clientepedidos', function (table) {
    table.dropIndex('created_at', 'idxDatacreated')
  })
}
