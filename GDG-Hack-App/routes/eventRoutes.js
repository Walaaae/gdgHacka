const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent
} = require('../controllers/eventController');

router.route('/events').get(getEvents).post(createEvent);
router.route('/events/:id').get(getEvent).patch(updateEvent).delete(deleteEvent);

module.exports = router;
