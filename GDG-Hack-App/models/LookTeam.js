const mongoose = require('mongoose');

const lookTeamSchema = new mongoose.Schema({
    skillsNeeded: {
        type: [String],
        required: true
    },
    requiredExperienceLevel: {
        type: String,
        required: true
    },
});

const LookTeamModel = mongoose.model('LookTeam', lookTeamSchema);

module.exports = LookTeamModel;

