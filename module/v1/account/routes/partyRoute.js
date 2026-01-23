const express = require('express');
const { addSales, listParty, addParty, editParty, detailsParty } = require('../controller/partyController');
const router = express.Router();

router.post('/add-parties', addParty)

router.post('/edit-parties', editParty)

router.post('/details-parties', detailsParty)

router.post('/list-parties', listParty)

module.exports = router;
