const EventModel = require('../models/eventModel');

const { CustomError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        res.status(StatusCodes.OK).json({ events });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

const getEvent = async (req, res) => {
    const { id: eventID } = req.params;

    try {
        const event = await EventModel.findById(eventID);

        if (!event) {
            throw new CustomError(`No event with id: ${eventID}`, StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({ event });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

const createEvent = async (req, res) => {
    const eventData = req.body;

    try {
        const event = new EventModel(eventData);
        const createdEvent = await event.save();

        res.status(StatusCodes.CREATED).json(createdEvent);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

const updateEvent = async (req, res) => {
    const { id: eventID } = req.params;
    const updateData = req.body;

    try {
        const event = await EventModel.findByIdAndUpdate(
            eventID,
            updateData,
            { new: true, runValidators: true }
        );

        if (!event) {
            throw new CustomError(`No event with id: ${eventID}`, StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({ event });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

const deleteEvent = async (req, res) => {
    const { id: eventID } = req.params;

    try {
        const event = await EventModel.findByIdAndDelete(eventID);

        if (!event) {
            throw new CustomError(`No event with id: ${eventID}`, StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({ success: true, data: 'Successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

module.exports = {
    getEvent,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};