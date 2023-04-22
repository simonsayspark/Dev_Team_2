const knex = require('../database/knex');
const CLAIMS_TABLE = 'claims';

const createClaim = async (employee_id, company_id, order_date, amount_requested, category, claim_description) => {
    const query = knex(CLAIMS_TABLE).insert({employee_id, company_id, order_date, amount_requested, category, claim_description});
    const results = await query;
    return results;
}

const updateClaim = async (employee_id, company_id, order_date, amount_requested, category, claim_description, amount_reimbursed, claim_status, ceo_comment) => {
    const query = knex(CLAIMS_TABLE).update({employee_id, company_id, order_date, amount_requested, category, claim_description, amount_reimbursed, claim_status, ceo_comment});
    const results = await query;
    return results;
}

const updateClaimComment = async (claim_number, ceo_comment) => {
    const query = knex(CLAIMS_TABLE).where({claim_number}).update({ceo_comment});
    const results = await query;
    return results;
}

const updateClaimStatus = async (claim_number, claim_status) => {
    const query = knex(CLAIMS_TABLE).where({claim_number}).update({claim_status});
    const results = await query;
    return results;
}

const updateClaimAmount = async (claim_number, amount_reimbursed) => {
    const query = knex(CLAIMS_TABLE).where({claim_number}).update({amount_reimbursed});
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

const getClaimsByEmployeeName = async (employee_id, claim_status, sortBy) => {
    const query = knex(CLAIMS_TABLE).union([
        knex(CLAIMS_TABLE).select(employee_id).where(claim_status).groupBy(employee_id),
        knex(EMPLOYEE_TABLE).select(employee_id).orderBy(sortBy)
      ]);
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

const getClaimsByCompanyId = async (company_id) => {
    const query = knex(CLAIMS_TABLE).where({company_id});
    const results = await query;
    return results;
}

const getClaimsOnDate = async (order_date) => {
    const query = knex(CLAIMS_TABLE).where({order_date});
    const results = await query;
    return results;
}

const getSortedClaimsByStatus = async (employee_id, claim_status, sortBy) => {
    const query = knex(CLAIMS_TABLE).where({employee_id}).where({claim_status}).orderBy(sortBy);
    const results = await query;
    return results;
}

const getSortedClaimsByExpenseRange = async (company_id, claim_status, minrange, maxrange, sortBy) => {
    const query = knex(CLAIMS_TABLE).where({company_id}).where({claim_status}).where(minrange < {amount_requested} < maxrange).orderBy(sortBy);
    const results = await query;
    return results;
}

module.exports = {
    createClaim,
    updateClaim,
    updateClaimStatus,
    updateClaimComment,
    getAllClaims,
    getClaimByNumber,
    getClaimsByEmployee,
    getClaimsByEmployeeName,
    getClaimsByStatus,
    DeleteClaimByNum,
    getClaimsByCompanyId,
    getClaimsOnDate,
    getSortedClaimsByStatus,
    getSortedClaimsByExpenseRange,
    updateClaimAmount
}