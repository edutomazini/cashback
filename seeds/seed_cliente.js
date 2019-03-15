const moment = require('moment');

exports.seed = function(knex, Promise) {
  return knex('clientes').del()
    .then(function () {
      return knex('clientes').insert([
        { id: 1, nome: 'Eduardo Tomazini', endereco: 'Rua Angelo Furlaneto', numero: '116', complemento: '', cep: '14165522', bairro: 'Jardim Santa Lucia', cidade: 'Ribeirão Preto', uf: 'SP', nascimento: moment().format('YYYY-MM-DD'), cpf_cnpj: '00000000001', rg_ie: '', telefone: '', celular: '(16)999259-9123', email: 'eduardotomazini@gmail.com', sexo: null},
        { id: 2, nome: 'CASH TESTE 1', endereco: 'Rua numero 1', numero: '321', complemento: '', cep: '14085-000', bairro: 'centro', cidade: 'Ribeirão Preto', uf: 'SP', nascimento: moment().format('YYYY-MM-DD'), cpf_cnpj: '02852810000100', rg_ie: '', telefone: '', celular: '(00)00000-0000', email: 'email@email.com', sexo: null},
        { id: 3, nome: 'CASH TESTE 2', endereco: 'Rua numero 1', numero: '321', complemento: '', cep: '14085-000', bairro: 'centro', cidade: 'Ribeirão Preto', uf: 'SP', nascimento: moment().format('YYYY-MM-DD'), cpf_cnpj: '67565619000114', rg_ie: '', telefone: '', celular: '(00)00000-0000', email: 'email@email.com', sexo: null},
        { id: 4, nome: 'CASH TESTE 3', endereco: 'Rua numero 1', numero: '321', complemento: '', cep: '14085-000', bairro: 'centro', cidade: 'Ribeirão Preto', uf: 'SP', nascimento: moment().format('YYYY-MM-DD'), cpf_cnpj: '71778273000100', rg_ie: '', telefone: '', celular: '(00)00000-0000', email: 'email@email.com', sexo: null}
      ]);
    });
};