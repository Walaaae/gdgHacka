const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    organizer: {
        type: String
    },
    category: {
        type: String,
        enum: ['hackathon', 'ideathon', 'conference', 'workshop']
    },
    registrationDeadline: {
        type: Date
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team' // Assuming you have a Team model
    }
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
