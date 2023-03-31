const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    const { name, email, password, role, company_id } = req.body;
    const registerEmployee = await req.models.employees.createEmployee(name, email, password, role, company_id);
    res.status(201).json(registerEmployee);
    next();
})

router.get('/', async (req, res, next) => {
    console.log('Req.query:')
    console.log(req.query)
    if (req.query.id) {
        const employeeById = await req.models.employees.getEmployeeById(req.query.id);
        res.json(employeeById);
        next();
    } else if (req.query.eemail) {
        const employeeByEmail = await req.models.employees.getEmployeeByEmail(req.query.eemail);
        res.json(employeeByEmail);
        next();
    } else {
        const allEmployees = await req.models.employees.getAllEmployees();
        res.json(allEmployees);
        next();
    }
})

module.exports = router;