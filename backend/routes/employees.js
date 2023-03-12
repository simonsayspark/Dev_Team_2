const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/employees', async (req, res, next) => {
    const { name, password, role, company_id } = req.body;
    const registerEmployee = await req.models.employees.createEmployee(name, password, role, company_id);
    next();
})