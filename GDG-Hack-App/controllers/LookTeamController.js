const { CustomError } = require('../errors/customError');
const LookTeamModel = require('../models/lookTeamModel');
const { StatusCodes } = require('http-status-codes');

const findMatchingTeams = async (req, res) => {
    
    const searchCriteria = req.body;

    try {
        
        const matchingTeams = await LookTeamModel.find({
            
            skillsNeeded: { $in: searchCriteria.skills },
            requiredExperienceLevel: searchCriteria.experienceLevel
           
        });

        res.status(StatusCodes.OK).json({ matchingTeams });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};

module.exports = { findMatchingTeams };
