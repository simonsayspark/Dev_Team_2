const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    const { name, password} = req.body;
    const registerCeo = await req.models.employees.createEmployee(name, password);
    res.status(201).json(registerCeo);
    next();
})

router.get('/', async (req, res, next) => {
    if (req.query.id) {
        const ceoById = await req.models.ceo.getCeoById(req.query.id);
        res.json(ceoById);
        next();
    } else {
        const allCeo = await req.models.ceo.getAllCeo();
        res.json(allCeo);
        next();
    }
})

module.exports = router;