exports.up = function (knex, Promise) {
  return knex.schema.alterTable('clientes', function(table) {
      table.string('senha', 100)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('clientes', function(table) {
      table.dropColumn('senha')
  })
}