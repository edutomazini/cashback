
exports.up = function (knex, Promise) {
  return knex.schema.createTable('cashback', table => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.string('diasemana', 20).notNullable()
    table.string('genero', 20)
    table.integer('cash').unsigned()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('cashback')
}
