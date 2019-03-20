
exports.up = function (knex, Promise) {
  return knex.schema.createTable('clientepedidos', table => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.integer('cliente_id').unsigned()
    table.decimal('valor', 8, 2)
    table.decimal('cashback', 5)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('clientepedidos')
}
