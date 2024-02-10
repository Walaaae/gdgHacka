const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    metrics: {
        type: Map,
        of: String,
        required: true
    },
    comments: {
        type: String
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const ResultModel = mongoose.model('Result', resultSchema);

module.exports = ResultModel;
