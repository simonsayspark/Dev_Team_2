const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

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