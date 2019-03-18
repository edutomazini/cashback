exports.up = function(knex, Promise) {
    return knex.schema.createTable('albums', table => {
        table.increments('id').primary()
        table.timestamps(true, true)
        table.string('nome', 200).notNullable()
        table.decimal('preco', 8, 2).notNullable()
        table.string('genero', 100).notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('albums')
};
