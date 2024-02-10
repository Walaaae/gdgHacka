const express = require('express');
const router = express.Router();
const {
  getSubmissions,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  getSubmission
} = require('../controllers/SubmissionController');

router.route('/submissions').get(getSubmissions).post(createSubmission);
router.route('/submissions/:id').get(getSubmission).patch(updateSubmission).delete(deleteSubmission);

module.exports = router;