const Registration = require("../models/Registration");

// REGISTER FOR EVENT
exports.registerForEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const existingRegistration =
      await Registration.findOne({
        userId,
        eventId
      });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Already registered for this event"
      });
    }

    const registration = await Registration.create({
      userId,
      eventId
    });

    res.status(201).json({
      message: "Registered successfully",
      registration
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET USER REGISTRATIONS
exports.getUserRegistrations = async (req, res) => {
  try {
    const registrations =
      await Registration.find({
        userId: req.params.userId
      }).populate("eventId");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ADMIN - GET ALL REGISTRATIONS
exports.getRegistrations = async (req, res) => {
  try {
    const registrations =
      await Registration.find()
        .populate("userId", "name email")
        .populate("eventId", "title date");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};