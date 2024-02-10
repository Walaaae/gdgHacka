const express = require("express");
const router = express.Router();

const {
    findMatchingProfiles
} = require('../controllers/LookprofileController');
 
router.route('/LookProfile')
    .get(findMatchingProfiles) 

module.exports = router; 