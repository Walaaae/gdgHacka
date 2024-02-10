const mongoose = require('mongoose');

const lookProfileSchema = new mongoose.Schema({
    skills: {
        type: [String],
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
});

const LookProfileModel = mongoose.model('LookProfile', lookProfileSchema);

module.exports = LookProfileModel;
