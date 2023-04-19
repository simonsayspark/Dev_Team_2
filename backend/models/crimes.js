const knex = require('../database/knex');
const CRIMINALS_TABLE = 'criminals';

const createCriminal = async (employee_id, company_id, order_date, amount_requested, category, criminal_description) => {
    const query = knex(CRIMINALS_TABLE).insert({employee_id, company_id, order_date, amount_requested, category, criminal_description});
    const results = await query;
    return results;
}

const updateCriminal = async (employee_id, company_id, order_date, amount_requested, category, criminal_description, amount_reimbursed, criminal_status) => {
    const query = knex(CRIMINALS_TABLE).update({employee_id, company_id, order_date, amount_requested, category, criminal_description, amount_reimbursed, criminal_status});
    const results = await query;
    return results;
}

const getAllCriminals = async () => {
    const query = knex(CRIMINALS_TABLE);
    const results = await query;
    return results;
}

const getCriminalByNumber = async (criminal_number) => {
    const query = knex(CRIMINALS_TABLE).where({ criminal_number });
    const results = await query;
    return results;
}

const getCriminalsByEmployee = async (employee_id) => {
    const query = knex(CRIMINALS_TABLE).where({ employee_id });
    const results = await query;
    return results;
}

const getCriminalsByStatus = async (employee_id, criminal_status) => {
    const query = knex(CRIMINALS_TABLE).where({employee_id}).where({criminal_status});
    const results = await query;
    return results;
}

const DeleteCriminalByNum = async (criminal_number) => {
    const query = knex(CRIMINALS_TABLE).where({ criminal_number }).del();
    const results = await query;
    return results;
}

const getCriminalsByCompanyId = async (company_id) => {
    const query = knex(CRIMINALS_TABLE).where({company_id});
    const results = await query;
    return results;
}

const getCriminalsOnDate = async (order_date) => {
    const query = knex(CRIMINALS_TABLE).where({order_date});
    const results = await query;
    return results;
}

const getSortedCriminalsByStatus = async (employee_id, criminal_status, sortBy) => {
    const query = knex(CRIMINALS_TABLE).where({employee_id}).where({criminal_status}).orderBy(sortBy);
    const results = await query;
    return results;
}

module.exports = {
    createCriminal,
    updateCriminal,
    getAllCriminals,
    getCriminalByNumber,
    getCriminalsByEmployee,
    getCriminalsByEmployeeName,
    getCriminalsByStatus,
    DeleteCriminalByNum,
    getCriminalsByCompanyId,
    getCriminalsOnDate,
    getSortedCriminalsByStatus
}