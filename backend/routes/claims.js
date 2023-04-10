const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
    const { employee_id, company_id, order_date, amount_requested, category, claim_description} = req.body;
    const addClaim = await req.models.claims.createClaim(employee_id, company_id, order_date, amount_requested, category, claim_description);
    res.status(201).json(addClaim);    
    next();
})

router.get('/', async (req, res, next) => {
    if (req.query.id) {
        const claimByNumber = await req.models.claims.getClaimByNumber(req.query.id);
        res.json(claimByNumber);
        next();
    } else {
        const allClaims = await req.models.claims.getAllClaims();
        res.json(allClaims);
        next();
    }
})

module.exports = router;