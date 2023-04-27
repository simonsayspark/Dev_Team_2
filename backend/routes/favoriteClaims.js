const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    console.log('Req.query:')
    console.log(req.query)
    if (req.query.id) {
        const claimbyemployee = await req.models.favoriteClaims.getClaimByEmployeeId(req.query.employee_id);
        res.json(claimbyemployee);
        next();
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { employee_id, claim_number } = req.body;
        const favClaim = await req.models.favoriteClaims.createFavoriteClaim(employee_id, claim_number);
        res.status(201).json(favClaim);
    } catch (err) {
        console.log('Failed to favorite claim', err)
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(201).json({
                message: 'That claim has already been favorited.'
            });
        }
    }
    next();
})

router.delete('/', async (req, res, next) => {
    if (req.query.claim_number) {
        const unfavClaimByClaimID = await req.models.favoriteClaims.unfavClaimByClaimID(req.query.claim_number);
        res.json(unfavClaimByClaimID);
        next();
    }
})