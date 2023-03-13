const knex = require('../database/knex');
const EMPLOYEES_TABLE = 'employees';

const createEmployee = async (ename, epassword, role, company_id) => {
    //FIXME need to add hashing password here
    const query = knex(EMPLOYEES_TABLE).insert({ename, epassword, role, company_id});
    const results = await query;
    return results;
}

const getAllEmployees = async () => {
    const query = knex(EMPLOYEES_TABLE);
    const results = await query;
    return results;
}

const getEmployeeById = async () => {
    const query = knex(EMPLOYEES_TABLE).where({ id });
    const results = await query;
    return results;
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById
}