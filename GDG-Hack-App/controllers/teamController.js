const TeamModel = require('../models/TeamModel');
const UserModel = require('../models/userModel');
const { CustomError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

const getTeams = async (req, res) => {
  try {
    const teams = await TeamModel.find();
    res.status(StatusCodes.OK).json({ teams });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const getTeam = async (req, res) => {
  const { id: teamID } = req.params;
  try {
    const team = await TeamModel.findById(teamID);
    if (team) {
      res.status(StatusCodes.OK).json({ team });
    } else {
      throw new CustomError(`No team with id: ${teamID}`, StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const createTeam = async (req, res) => {
  const { userID } = req.user;
  const { name, numberOfMembers } = req.body;

  try {
    // Check if a team already exists with the same leader
    const existingTeam = await TeamModel.findOne({ leader: userID });

    if (existingTeam) {
      throw new CustomError('Team already exists', StatusCodes.BAD_REQUEST);
    }

    // Create a new team
    const newTeam = new TeamModel({
      name,
      numberOfMembers,
      leader: userID
    });

    // Save the new team to the database
    const createdTeam = await newTeam.save();

    res.status(StatusCodes.OK).json(createdTeam);
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const updateTeam = async (req, res) => {
  const { userID } = req.user;
  const { id: teamID } = req.params;
  const updateData = req.body;

  try {
    // Find and update the team
    const team = await TeamModel.findOneAndUpdate(
      { _id: teamID, leader: userID },
      updateData,
      { new: true, runValidators: true }
    );

    // Check if the team was found and updated
    if (!team) {
      throw new CustomError(`No team with id: ${teamID}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ team });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const deleteTeam = async (req, res) => {
  const { userID } = req.user;
  const { id: teamID } = req.params;
  try {
    const team = await TeamModel.findOneAndDelete({ _id: teamID, leader: userID });
    if (!team) {
      throw new CustomError(`No team with id: ${teamID}`, StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({ success: true, data: 'Successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};


module.exports = {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
};