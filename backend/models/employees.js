const knex = require('../database/knex');
const EMPLOYEES_TABLE = 'employees';

const createEmployee = async (ename, epassword, role, company_id) => {
    //FIXME need to add hashing password here
    const query = knex(EMPLOYEES_TABLE).insert({ename, epassword, role, company_id});
    const results = await query;
    return results;
}

module.exports = {
    createEmployee
}