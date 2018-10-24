const express = require('express');
const { getDestinations, saveDestinations } = require('./lowfare');

const router = express.Router();

router.get('/destinations', getDestinations);
router.put('/destinations', saveDestinations);

module.exports = router
