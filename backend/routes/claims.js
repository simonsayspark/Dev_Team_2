const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    if (req.query.id) {
        const claimByNumber = await req.models.ceo.getClaimByNumber(req.query.id);
        res.json(claimByNumber);
        next();
    } else {
        const allClaims = await req.models.ceo.getAllClaims();
        res.json(allClaims);
        next();
    }
})

module.exports = router;