const knex = require('../database/knex');
const FAVORITECLAIMS_TABLE = 'favoriteClaims';

const createFavoriteClaim = async (employee_id, claim_number) => {
    const query = knex(FAVORITECLAIMS_TABLE).insert({employee_id, claim_number});
    const results = await query;
    return results;
}

const getFavoriteClaims = async () => {
    const query = knex(FAVORITECLAIMS_TABLE);
    const results = await query;
    return results;
}

const getClaimByEmployeeId = async (employee_id) => {
    const query = knex(FAVORITECLAIMS_TABLE).where({ employee_id });
    const results = await query;
    return results;
}

module.exports = {
    createFavoriteClaim,
    getFavoriteClaims,
    getClaimByEmployeeId
}