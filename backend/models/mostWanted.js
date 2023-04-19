const knex = require('../database/knex');
const MOSTWANTED_TABLE = 'mostWanted';
const bcrypt = require('bcryptjs');

const createMostWanted = async (mostWanted_name, cemail, cpassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cpassword, salt);

    const query = knex(MOSTWANTED_TABLE).insert({mostWanted_name, cemail, cpassword: hashedPassword});
    const results = await query;
    return results;
}

const getAllMostWanted = async () => {
    const query = knex(MOSTWANTED_TABLE);
    const results = await query;
    return results;
}

const getMostWantedById = async (mostWanted_id) => {
    const query = knex(MOSTWANTED_TABLE).where({ mostWanted_id });
    const results = await query;
    return results;
}

const getMostWantedByEmail = async (cemail) => {
    const query = knex(MOSTWANTED_TABLE).where({ cemail });
    const results = await query;
    return results;
}

const DeleteMostWantedById = async (mostWanted_id) => {
    const query = knex(MOSTWANTED_TABLE).where({ mostWanted_id }).del();
    const results = await query;
    return results;
}


module.exports = {
    createMostWanted,
    getAllMostWanted,
    getMostWantedById,
    getMostWantedByEmail,
    DeleteMostWantedById
}