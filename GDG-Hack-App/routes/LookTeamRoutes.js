const express = require("express");
const router = express.Router();

const {
    findMatchingTeames
} = require('../controllers/LookproTeamController');
 
router.route('/LookProfile')
    .get(findMatchingTeames)  

module.exports = router; 