const knex = require('knex');
const configuration = require('../../../knexfile');

const connection = knex(configuration.production);

global.connection = connection;

module.exports = connection;