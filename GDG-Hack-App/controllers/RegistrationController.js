const RegistrationModel = require('../models/RegistrationModel');
const UserModel = require('../models/userModel');
const EventModel = require('../models/eventModel');

// Create a new registration
async function createRegistration(data) {
  try {
    const registration = new RegistrationModel(data);
    return await registration.save();
  } catch (error) {
    throw error;
  }
}

// Retrieve a registration by its ID
async function getRegistrationById(id) {
  try {
    const registration = await RegistrationModel.findById(id);
    if (!registration) return null;

    // Manually populate user and event fields
    const user = await UserModel.findById(registration.user);
    const event = await EventModel.findById(registration.event);
    registration.user = user;
    registration.event = event;

    return registration;
  } catch (error) {
    throw error;
  }
}

// Update an existing registration
async function updateRegistration(id, newData) {
  try {
    return await RegistrationModel.findByIdAndUpdate(id, newData, { new: true });
  } catch (error) {
    throw error;
  }
}

// Delete a registration by its ID
async function deleteRegistration(id) {
  try {
    return await RegistrationModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}

// Retrieve all registrations
async function getAllRegistrations() {
    try {
      return await RegistrationModel.find();
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  createRegistration,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getAllRegistrations
};
