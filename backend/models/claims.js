const knex = require('../database/knex');
const CLAIMS_TABLE = 'claims';

const createClaim = async (employee_id, company_id, order_date, amount_requested, category, claim_description) => {
    const query = knex(CLAIMS_TABLE).insert({employee_id, company_id, order_date, amount_requested, category, claim_description});
    const results = await query;
    return results;
}

const updateClaim = async (employee_id, company_id, order_date, amount_requested, category, claim_description, amount_reimbursed, claim_status) => {
    const query = knex(CLAIMS_TABLE).update({employee_id, company_id, order_date, amount_requested, category, claim_description, amount_reimbursed, claim_status});
    const results = await query;
    return results;
}

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
    createClaim,
    updateClaim,
    getAllClaims,
    getClaimByNumber
}