const knex = require('../database/knex');
const EMPLOYEES_TABLE = 'employees';
const bcrypt = require('bcrypt');

const createEmployee = async (ename, epassword, role, company_id) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(epassword, salt);

    const query = knex(EMPLOYEES_TABLE).insert({ename, hashedPassword, role, company_id});
    const results = await query;
    return results;
}

const getAllEmployees = async () => {
    const query = knex(EMPLOYEES_TABLE);
    const results = await query;
    return results;
}

const getEmployeeById = async (id) => {
    const query = knex(EMPLOYEES_TABLE).where({ id });
    const results = await query;
    return results;
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById
}