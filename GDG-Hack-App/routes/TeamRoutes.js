const express = require('express');
const router = express.Router();
const {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam
} = require('../controllers/teamController');

router.route('/teams').get(getTeams).post(createTeam);
router.route('/teams/:id').get(getTeam).patch(updateTeam).delete(deleteTeam);

module.exports = router;