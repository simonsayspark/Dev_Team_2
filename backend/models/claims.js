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

const getClaimByNumber = async (claim_number) => {
    const query = knex(CLAIMS_TABLE).where({ claim_number });
    const results = await query;
    return results;
}

const getClaimsByEmployee = async (employee_id) => {
    const query = knex(CLAIMS_TABLE).where({ employee_id });
    const results = await query;
    return results;
}

const getClaimsByStatus = async (employee_id, claim_status) => {
    const query = knex(CLAIMS_TABLE).where({employee_id}).where({claim_status});
    const results = await query;
    return results;
}

const DeleteClaimByNum = async (claim_number) => {
    const query = knex(CLAIMS_TABLE).where({ claim_number }).del();
    const results = await query;
    return results;
}

module.exports = {
    createClaim,
    updateClaim,
    getAllClaims,
    getClaimByNumber,
    getClaimsByEmployee,
    getClaimsByStatus,
    DeleteClaimByNum
}