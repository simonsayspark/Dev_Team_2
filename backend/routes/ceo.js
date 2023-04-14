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
    if (req.query.cid) {
        const ceoById = await req.models.ceo.getCeoById(req.query.cid);
        res.json(ceoById);
        next();
    } else if (req.query.cemail) {
        const ceoByEmail = await req.models.ceo.getCeoByEmail(req.query.cemail);
        res.json(ceoByEmail);
        next();
    } else {
        const allCeo = await req.models.ceo.getAllCeo();
        res.json(allCeo);
        next();
    }
})

router.delete('/', async (req, res, next) => {
    if (req.query.cid) {
        const DeleteCeoById = await req.models.ceo.DeleteCEOById(req.query.cid);
        res.json(DeleteCeoById);
        next();
    }
})

module.exports = router;