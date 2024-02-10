const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  motivation: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' // Reference to the Event model
  }
});

const RegistrationModel = mongoose.model('Registration', registrationSchema);

module.exports = RegistrationModel;
