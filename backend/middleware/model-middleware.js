const Employees = require('../models/employees');
const Companies = require('../models/companies');
const Ceo = require('../models/ceo');
const createModelsMiddleware = async (req, res, next) => {
    req.models = {
        employees: Employees,
        companies: Companies,
        ceo: Ceo
    }
    next();
}
module.exports = {
    createModelsMiddleware
}