const SubmissionModel = require('../models/');
const TeamModel = require('../models/TeamModel');
const { CustomError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

const getSubmissions = async (req, res) => {
  try {
    const submissions = await SubmissionModel.find();
    res.status(StatusCodes.OK).json({ submissions });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const createSubmission = async (req, res) => {
  const { title, description, teamId } = req.body;

  try {
    const team = await TeamModel.findById(teamId);

    if (!team) {
      throw new CustomError(`No team with id: ${teamId}`, StatusCodes.NOT_FOUND);
    }

    const submission = new SubmissionModel({
      title,
      description,
      team: team._id,
      submitter: team.leader // Assuming 'leader' is the ID of the team leader
    });

    const createdSubmission = await submission.save();

    res.status(StatusCodes.CREATED).json(createdSubmission);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const getSubmission = async (req, res) => {
  const { id: submissionId } = req.params;

  try {
    const submission = await SubmissionModel.findById(submissionId);

    if (!submission) {
      throw new CustomError(`No submission with id: ${submissionId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ submission });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const updateSubmission = async (req, res) => {
  const { id: submissionId } = req.params;
  const updateData = req.body;

  try {
    const submission = await SubmissionModel.findByIdAndUpdate(
      submissionId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!submission) {
      throw new CustomError(`No submission with id: ${submissionId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ submission });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

const deleteSubmission = async (req, res) => {
  const { id: submissionId } = req.params;

  try {
    const submission = await SubmissionModel.findByIdAndDelete(submissionId);

    if (!submission) {
      throw new CustomError(`No submission with id: ${submissionId}`, StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ success: true, data: 'Successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }
};

module.exports = {
  getSubmissions,
  createSubmission,
  getSubmission,
  updateSubmission,
  deleteSubmission
};