const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    try { //try to add the user
        const { name, email, password, role, company_id } = req.body;
        const registerEmployee = await req.models.employees.createEmployee(name, email, password, role, company_id);
        res.status(201).json(registerEmployee);    
    } catch (err) {
        console.log('Failed to create user', err)
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(201).json({
                message: 'Email already in use. Please use another email or log in to your existing account.'
            });
        }
    }
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

router.delete('/', async (req, res, next) => {
    if (req.query.id) {
        const DelEmployeeById = await req.models.ceo.DeleteEmployeeById(req.query.id);
        res.json(DelEmployeeById);
        next();
    }
})

module.exports = router;