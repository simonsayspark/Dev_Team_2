const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    const { name, email, password} = req.body;
    const registerCeo = await req.models.ceo.createCeo(name, email, password);
    res.status(201).json(registerCeo);
    next();
})

router.get('/', async (req, res, next) => {
    if (req.query.id) {
        const ceoById = await req.models.ceo.getCeoById(req.query.id);
        res.json(ceoById);
        next();
    } else if (req.query.email) {
        const ceoByEmail = await req.models.ceo.getCeoByEmail(req.query.email);
        res.json(ceoByEmail);
        next();
    } else {
        const allCeo = await req.models.ceo.getAllCeo();
        res.json(allCeo);
        next();
    }
})

module.exports = router;