const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    if (req.query.id) {
        const companyById = await req.models.companies.getCompanyById(req.query.id);
        res.json(companyById);
        next();
    } else {
        const allCompanies = await req.models.companies.getAllCompanies();
        res.json(allCompanies);
        next();
    }
})

module.exports = router;