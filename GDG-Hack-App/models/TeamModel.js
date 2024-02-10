const mongoose = require('mongoose');

// Define the Team schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  numberOfMembers: {
    type: Number,
    
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create the Team model
const Team = mongoose.model('Team', teamSchema);

// Export the Team model
module.exports = Team;