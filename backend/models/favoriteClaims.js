const knex = require('../database/knex');
const FAVORITECLAIMS_TABLE = 'favoriteClaims';

const createFavoriteClaim = async (employeeId, claimNumber) => {
    const query = knex(FAVORITECLAIMS_TABLE).insert({employeeId, claimNumber});
    const results = await query;
    return results;
}

const getFavoriteClaims = async () => {
    const query = knex(FAVORITECLAIMS_TABLE);
    const results = await query;
    return results;
}

const getCompanyByEmployeeId = async (employeeId) => {
    const query = knex(FAVORITECLAIMS_TABLE).where({ employeeId });
    const results = await query;
    return results;
}

module.exports = {
    createFavoriteClaim,
    getFavoriteClaims,
    getCompanyByEmployeeId
}