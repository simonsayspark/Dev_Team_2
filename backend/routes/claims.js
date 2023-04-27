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

router.put('/', async (req, res, next) => {
    if(req.query.claim_number) {
        if(req.query.claim_status) {
            if (req.query.appeal_comment) {
                const appealComment = await req.models.claims.addAppealComment(req.query.claim_number, req.query.claim_status, req.query.appeal_comment);
                res.json(appealComment);
            } else {
                const updateClaimStat = await req.models.claims.updateClaimStatus(req.query.claim_number, req.query.claim_status);
                res.json(updateClaimStat);
            }
        } else if(req.query.ceo_comment){
            const updateClaimCom = await req.models.claims.updateClaimComment(req.query.claim_number, req.query.ceo_comment);
            res.json(updateClaimCom);
        } else if(req.query.amount_reimbursed){
            const updateClaimReim = await req.models.claims.updateClaimAmount(req.query.claim_number, req.query.amount_reimbursed);
            res.json(updateClaimReim);
        }
    } else {
        const { claim_number, order_date, amount_requested, category, claim_description, amount_reimbursed, claim_status, ceo_comment} = req.body;
        const updateClaim = await req.models.claims.updateClaim(claim_number, order_date, amount_requested, category, claim_description, amount_reimbursed, claim_status, ceo_comment);
        res.json(updateClaim); 
    }   
    next();
})


router.get('/', async (req, res, next) => {
    if (req.query.claim_number) { //Getting claims by claim_number
        const claimByNumber = await req.models.claims.getClaimByNumber(req.query.claim_number);
        res.json(claimByNumber);
        next();
    } else if (req.query.employee_id) {
        if (req.query.claim_status) { //Getting claims by employee_id and claim_status
            if (req.query.sortBy) { //If sorting by something
                const sortBy = req.query.sortBy;
                if (sortBy == 'Date') {
                    const sortedClaimsByStatus = await req.models.claims.getSortedClaimsByStatus(req.query.employee_id, req.query.claim_status, 'order_date');
                    res.json(sortedClaimsByStatus);
                } else if (sortBy == 'Amount') {
                    const sortedClaimsByStatus = await req.models.claims.getSortedClaimsByStatus(req.query.employee_id, req.query.claim_status, 'amount_requested');
                    res.json(sortedClaimsByStatus);
                } else if (sortBy == 'Category') {
                    const sortedClaimsByStatus = await req.models.claims.getSortedClaimsByStatus(req.query.employee_id, req.query.claim_status, 'category');
                    res.json(sortedClaimsByStatus);
                }
            } else {
                const claimByStatus = await req.models.claims.getClaimsByStatus(req.query.employee_id, req.query.claim_status);
                res.json(claimByStatus);    
            }
        } else { //Getting claims only by employee_id
            const claimByEmployee = await req.models.claims.getClaimsByEmployee(req.query.employee_id);
            res.json(claimByEmployee);
        }
        next();
    } else if (req.query.company_id) { //Getting claims by company_id
        if (req.query.claim_status) { //Getting claims by company_id and claim_status
            if (req.query.sortBy) { //If sorting by something
                const sortBy = req.query.sortBy;
                if (sortBy == 'Date') {
                    const sortedClaimsByStatus = await req.models.claims.getSortedCompanyClaimsByStatus(req.query.company_id, req.query.claim_status, 'order_date');
                    res.json(sortedClaimsByStatus);
                } else if (sortBy == 'Amount') {
                    const sortedClaimsByStatus = await req.models.claims.getSortedCompanyClaimsByStatus(req.query.company_id, req.query.claim_status, 'amount_requested');
                    res.json(sortedClaimsByStatus);
                } else if (sortBy == 'Category') {
                    const sortedClaimsByStatus = await req.models.claims.getSortedCompanyClaimsByStatus(req.query.company_id, req.query.claim_status, 'category');
                    res.json(sortedClaimsByStatus);
                } else if (sortBy == 'Name') {
                    const sortedClaimsByStatus = await req.models.claims.getClaimsByEmployeeName(req.query.company_id, req.query.claim_status, 'ename');
                    res.json(sortedClaimsByStatus);
                }
            }
            else { //Getting claims by company_id and status
                const claimsByCompanyAndStatus = await req.models.claims.getCompanyClaimsByStatus(req.query.company_id, req.query.claim_status);
                res.json(claimsByCompanyAndStatus);
            }
        } else { //Getting claims only by company_id
            const claimsByCompany = await req.models.claims.getClaimsByCompanyId(req.query.company_id);
            res.json(claimsByCompany);
        }
        next();
    } else if (req.query.order_date) {
        const claimsOnDate = await req.models.claims.getClaimsOnDate(req.query.order_date);
        res.json(claimsOnDate);
        next();
    } else { //Getting all claims in the database
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