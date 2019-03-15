const knexfile = require('../knexfile')
const knex = require('knex')(knexfile)
const setupPaginator = require('knex-paginator');
setupPaginator(knex);
module.exports = knex