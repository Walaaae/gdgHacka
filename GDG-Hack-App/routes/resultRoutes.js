const express = require("express");
const router = express.Router();
const {
    getResult,
    getResults,
    createResult,
    updateResult,
    deleteResult
} = require('../controllers/resultController');

router.route('/results')
    .get(getResults)
    .post(createResult);

router.route('/results/:id')
    .get(getResult)
    .patch(updateResult)
    .delete(deleteResult);

module.exports = router;
