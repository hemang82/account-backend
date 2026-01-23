const express = require('express');
const router = express.Router();

const party_routes = require('./account/routes/partyRoute')

const sales_routes = require('./account/routes/salesRoute')

router.use('/party/',party_routes);

router.use('/sales/', sales_routes);

module.exports = router;
