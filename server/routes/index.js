const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();

const appController = require('../controllers/appController');

/** BACKGROUND PROCESS **/

//get latest rates for all pairs from external service
router.get('/import-rates', appController.importRates);

/** API ROUTES FROM CLIENT **/

//get pairs and basic info from db
router.get('/pairs', appController.getPairs);

//get historical data of a pair from db
router.get('/historical-rates/:base/:quote', appController.getHistoricalRates);

module.exports = router;
