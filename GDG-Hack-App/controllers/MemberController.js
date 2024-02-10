const MemberModel = require('../models/MemberModel');
const { CustomError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');


const getMembers = async (req, res) => {
    const { teamId } = req.user;
    const members = await MemberModel.find({ team: teamId });
    res.status(StatusCodes.OK).json({ members });
  };




const getMember = async (req, res) => {
  const { teamId } = req.user;
  const { id: memberId } = req.params;
  const member = await MemberModel.findOne({ team: teamId, _id: memberId });
  if (member) {
    res.status(StatusCodes.OK).json({ member });
  } else {
    throw new CustomError(`No member with id: ${memberId}`, StatusCodes.NOT_FOUND);
  }
};

const createMember = async (req, res) => {
  const { teamId } = req.user;
  const { name, email } = req.body; // Assuming name and email are the required fields for a member
  const member = await MemberModel.findOne({ team: teamId, name, email });
  if (member) {
    throw new CustomError(`Member already exists`, StatusCodes.BAD_REQUEST);
  } else {
    const newMember = await MemberModel.create({ team: teamId, name, email });
    res.status(StatusCodes.OK).json(newMember);
  }
};

const updateMember = async (req, res) => {
  const { teamId } = req.user;
  const { id: memberId } = req.params;

  const member = await MemberModel.findOneAndUpdate(
    { _id: memberId, team: teamId },
    {},
    {
      new: true, // return the updated member
      runValidators: true, // run validators on the updated member
      select: '-name -email' // exclude the name and email fields from the updated member
    }
  );

  if (!member) {
    throw new CustomError(`No member with id: ${memberId}`, StatusCodes.NOT_FOUND);
  } else {
    res.status(StatusCodes.OK).json({ member });
  }
};

const deleteMember = async (req, res) => {
  const { teamId } = req.user;
  const { id: memberId } = req.params;
  const member = await MemberModel.findOneAndDelete({ _id: memberId, team: teamId });
  if (!member) {
    throw new CustomError(`No member with id: ${memberId}`, StatusCodes.NOT_FOUND);
  } else {
    res.status(StatusCodes.OK).json({ success: true, data: 'Successfully deleted' });
  }
};

module.exports = {
  getMember,
  getMembers,
  createMember,
  updateMember,
  deleteMember
};