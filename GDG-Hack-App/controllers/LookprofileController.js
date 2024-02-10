const { CustomError } = require('../errors/customError');
const LookProfileModel = require('../models/LookProfileModel'); 
const { StatusCodes } = require('http-status-codes');

const findMatchingProfiles = async (req, res) => {
    const searchCriteria = req.body;

    try {
        const matchingProfiles = await LookProfileModel.find({
            skills: { $in: searchCriteria.skills },
            experienceLevel: searchCriteria.experienceLevel
        });

        res.status(StatusCodes.OK).json({ matchingProfiles });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

module.exports = { findMatchingProfiles };
