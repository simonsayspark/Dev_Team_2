const knex = require('../database/knex');
const COMPANIES_TABLE = 'companies';

const getAllCompanies = async () => {
    const query = knex(COMPANIES_TABLE);
    const results = await query;
    return results;
}

const getCompanyById = async (id) => {
    const query = knex(COMPANIES_TABLE).where({ id });
    const results = await query;
    return results;
}

module.exports = {
    getAllCompanies,
    getCompanyById
}