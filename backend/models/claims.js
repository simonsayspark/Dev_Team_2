const knex = require('../database/knex');
const CLAIMS_TABLE = 'claims';

const getAllClaims = async () => {
    const query = knex(CLAIMS_TABLE);
    const results = await query;
    return results;
}

const getClaimByNumber = async (number) => {
    const query = knex(CLAIMS_TABLE).where({ number });
    const results = await query;
    return results;
}

module.exports = {
    getAllClaims,
    getClaimByNumber
}