const TeamModel = require('../models/TeamModel');

const { CustomError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');


const getPresentations = async (req, res) => {
    try {
      const presentations = await PresentationModel.find();
      res.status(StatusCodes.OK).json({ presentations });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
  };


  const getPresentation = async (req, res) => {
    const { id: presentationID } = req.params;
  
    try {
      const presentation = await PresentationModel.findById(presentationID);
  
      if (!presentation) {
        throw new CustomError(`No presentation with id: ${presentationID}`, StatusCodes.NOT_FOUND);
      }
  
      res.status(StatusCodes.OK).json({ presentation });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
  };


  const createPresentation = async (req, res) => {
    const { teamID } = req.params;
    const { title, description } = req.body;
  
    try {
      const presentation = new PresentationModel({
        title,
        description,
        team: teamID
      });
  
      const createdPresentation = await presentation.save();
  
      res.status(StatusCodes.CREATED).json(createdPresentation);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
  };

  const updatePresentation = async (req, res) => {
    const { id: presentationID } = req.params;
    const updateData = req.body;
  
    try {
      const presentation = await PresentationModel.findByIdAndUpdate(
        presentationID,
        updateData,
        { new: true, runValidators: true }
      );
  
      if (!presentation) {
        throw new CustomError(`No presentation with id: ${presentationID}`, StatusCodes.NOT_FOUND);
      }
  
      res.status(StatusCodes.OK).json({ presentation });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
  };



  const deletePresentation = async (req, res) => {
    const { id: presentationID } = req.params;
  
    try {
      const presentation = await PresentationModel.findByIdAndDelete(presentationID);
  
      if (!presentation) {
        throw new CustomError(`No presentation with id: ${presentationID}`, StatusCodes.NOT_FOUND);
      }
  
      res.status(StatusCodes.OK).json({ success: true, data: 'Successfully deleted' });
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




module.exports = {
  getPresentation,
  getPresentations,
  createPresentation,
  updatePresentation,
  deletePresentation,
};