const knex = require('../database/knex');
const CEO_TABLE = 'ceo';
const bcrypt = require('bcryptjs');

const createCeo = async (cname, cemail, cpassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cpassword, salt);

    const query = knex(CEO_TABLE).insert({cname, cemail, cpassword: hashedPassword});
    const results = await query;
    return results;
}

const getAllCeo = async () => {
    const query = knex(CEO_TABLE);
    const results = await query;
    return results;
}

const getCeoById = async (ceo_id) => {
    const query = knex(CEO_TABLE).where({ ceo_id });
    const results = await query;
    return results;
}

const getCeoByEmail = async (cemail) => {
    const query = knex(CEO_TABLE).where({ cemail });
    const results = await query;
    return results;
}

const DeleteCEOById = async (cid) => {
    const query = knex(CEO_TABLE).where({ cid }).del();
    const results = await query;
    return results;
}


module.exports = {
    createCeo,
    getAllCeo,
    getCeoById,
    getCeoByEmail,
    DeleteCEOById
}