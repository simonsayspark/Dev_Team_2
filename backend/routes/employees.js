const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    const { name, password, role, company_id } = req.body;
    const registerEmployee = await req.models.employees.createEmployee(name, password, role, company_id);
    res.status(201).json(registerEmployee);
    next();
})

router.get('/', async (req, res, next) => {
    if (req.query.id) {
        const employeeById = await req.models.employees.getEmployeeById(req.query.id);
        res.json(employeeById);
        next();
    } else {
        const allEmployees = await req.models.employees.getAllEmployees();
        res.json(allEmployees);
        next();
    }
})

module.exports = router;