const knex = require('../database/knex');
const CEO_TABLE = 'ceo';
const bcrypt = require('bcrypt');

const createCeo = async (cname, cemail, cpassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cpassword, salt);

    const query = knex(EMPLOYEES_TABLE).insert({cname, cemail, cpassword: hashedPassword});
    const results = await query;
    return results;
}

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
    createCeo,
    getAllCeo,
    getCeoById
}