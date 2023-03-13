const knex = require('../database/knex');
const CEO_TABLE = 'ceo';

const getAllCeo = async () => {
    const query = knex(CEO_TABLE);
    const results = await query;
    return results;
}

const getCeoById = async (id) => {
    const query = knex(CEO_TABLE).where({ id });
    const results = await query;
    return results;
}

module.exports = {
    getAllCeo,
    getCeoById
}