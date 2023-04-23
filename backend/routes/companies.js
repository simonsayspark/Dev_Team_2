const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    try {
        const { company_name, ceo_id } = req.body;
        const registerCompany = await req.models.companies.createCompany(company_name, ceo_id);
        res.status(201).json(registerCompany);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(201).json({
                message: 'Company name already in use. Please use a different company name.'
            });
        }
    }

    next();
})

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

router.delete('/', async (req, res, next) => {
    if (req.query.company_id) {
        const DelCompanyById = await req.models.companies.DeleteCompanyById(req.query.company_id);
        res.json(DelCompanyById);
        next();
    }
})

module.exports = router;