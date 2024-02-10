const { CustomError } = require('../errors/customError');
const ResultModel = require('../models/resultModel');
const { StatusCodes } = require('http-status-codes');

// Function to get all results
const getResults = async (req, res) => {
    try {
        const results = await ResultModel.find();
        res.status(StatusCodes.OK).json({ results });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

// Function to get a specific result by ID
const getResult = async (req, res) => {
    const { id: resultID } = req.params;

    try {
        const result = await ResultModel.findById(resultID);

        if (!result) {
            throw new CustomError(`No result with id: ${resultID}`, StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({ result });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

// Function to create a new result
const createResult = async (req, res) => {
    const resultData = req.body;

    try {
        // Check if a result with the same eventId and teamId already exists
        const existingResult = await ResultModel.findOne({
            eventId: resultData.eventId,
            teamId: resultData.teamId
        });

        if (existingResult) {
            // If a result already exists, return an error
            return res.status(StatusCodes.CONFLICT).json({ error: 'Result already exists for this event and team' });
        }

        // If no existing result found, create a new one
        const result = new ResultModel(resultData);
        const createdResult = await result.save();

        res.status(StatusCodes.CREATED).json(createdResult);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};


// Function to update an existing result
const updateResult = async (req, res) => {
    const { id: resultID } = req.params;
    const updateData = req.body;

    try {
        const result = await ResultModel.findByIdAndUpdate(
            resultID,
            updateData,
            { new: true, runValidators: true }
        );

        if (!result) {
            throw new CustomError(`No result with id: ${resultID}`, StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({ result });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

// Function to delete a result
const deleteResult = async (req, res) => {
    const { id: resultID } = req.params;

    try {
        const result = await ResultModel.findByIdAndDelete(resultID);

        if (!result) {
            throw new CustomError(`No result with id: ${resultID}`, StatusCodes.NOT_FOUND);
        }

        res.status(StatusCodes.OK).json({ success: true, data: 'Successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

module.exports = {
    getResults,
    getResult,
    createResult,
    updateResult,
    deleteResult
};
