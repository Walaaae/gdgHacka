const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  request_status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected']
  }
});

const MemberModel = mongoose.model('Member', memberSchema);

module.exports = MemberModel;