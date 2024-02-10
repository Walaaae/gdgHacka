const express = require('express');
const router = express.Router();
const {
  getPresentations,
  createPresentation,
  updatePresentation,
  deletePresentation,
  getPresentation
} = require('../controllers/PresentationController');

router.route('/presentations').get(getPresentations).post(createPresentation);
router.route('/presentations/:id').get(getPresentation).patch(updatePresentation).delete(deletePresentation);

module.exports = router;
