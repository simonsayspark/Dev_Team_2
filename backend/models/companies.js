const knex = require('../database/knex');
const COMPANIES_TABLE = 'companies';

const createCompany = async (name, ceoId) => {
    const query = knex(COMPANIES_TABLE).insert({name, ceoId});
    const results = await query;
    return results;
}

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
    createCompany,
    getAllCompanies,
    getCompanyById
}