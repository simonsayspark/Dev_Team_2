const knex = require('../database/knex');
const COMPANIES_TABLE = 'companies';

const createCompany = async (company_name, ceo_id) => {
    const query = knex(COMPANIES_TABLE).insert({company_name, ceo_id});
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

const DeleteCompanyById = async (company_id) => {
    const query = knex(COMPANIES_TABLE).where({ company_id }).del();
    const results = await query;
    return results;
}

module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    DeleteCompanyById
}