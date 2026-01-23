const express = require('express');
const { addSales, listSales, addParty, editSales, detailSales } = require('../controller/salesController');
const router = express.Router();

router.post('/add-sales', addSales)

router.post('/edit-sales', editSales)

router.post('/details-sales', detailSales)

router.post('/list-sales', listSales)

module.exports = router;
