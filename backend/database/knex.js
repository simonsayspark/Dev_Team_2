const knexConfig = require('../knexfile');
const knex = require('knex');
module.exports = knex(knexConfig.cloud);