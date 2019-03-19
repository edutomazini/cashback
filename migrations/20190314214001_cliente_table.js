
exports.up = function (knex, Promise) {
  return knex.schema.createTable('clientes', table => {
    table.increments('id').primary()
    table.timestamps(true, true)
    table.string('nome', 200).notNullable()
    table.string('endereco', 200)
    table.string('numero', 5)
    table.string('complemento', 40)
    table.string('cep', 15)
    table.string('bairro', 100)
    table.string('cidade', 150)
    table.string('uf', 2)
    table.date('nascimento')
    table.string('cpf_cnpj', 20)
    table.string('rg_ie', 20)
    table.string('telefone', 15)
    table.string('celular', 15)
    table.string('email', 200)
    table.string('sexo', 1)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('clientes')
}
