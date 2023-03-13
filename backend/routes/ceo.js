const bodyParser = require('body-parser');
const express = require('express');
router = express.Router();
router.use(bodyParser.json());


module.exports = router;