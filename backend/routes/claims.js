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
    if (req.query.claim_number) { //Getting claims by claim_number
        const claimByNumber = await req.models.claims.getClaimByNumber(req.query.claim_number);
        res.json(claimByNumber);
        next();
    } else if (req.query.employee_id) {
        if (req.query.claim_status) { //Getting claims by employee_id and claim_status
            console.log('WORKING')
            const claimByStatus = await req.models.claims.getClaimsByStatus(req.query.employee_id, req.query.claim_status);
            res.json(claimByStatus);
        } else { //Getting claims only by employee_id
            const claimByEmployee = await req.models.claims.getClaimsByEmployee(req.query.employee_id);
            res.json(claimByEmployee);    
        }
        next();
    } else { //Getting all claims in the database
        console.log('NOT WORKING')
        console.log(req.query)
        const allClaims = await req.models.claims.getAllClaims();
        res.json(allClaims);
        next();
    }
})

router.delete('/', async (req, res, next) => {
    if (req.query.claim_number) {
        const DelClaimByNum = await req.models.claims.DeleteClaimByNum(req.query.claim_number);
        res.json(DelClaimByNum);
        next();
    }
})

module.exports = router;