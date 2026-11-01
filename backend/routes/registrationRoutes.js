const express = require("express");

const Registration = require("../models/Registration");
const Event = require("../models/Event");

const {
  authMiddleware,
  adminMiddleware,
  studentMiddleware
} = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// REGISTER FOR EVENT
// ========================================

router.post(
  "/:eventId",
  authMiddleware,
  studentMiddleware,
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.eventId);

      if (!event) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      // Check if already registered
      const existingRegistration =
        await Registration.findOne({
          user: req.user.id,
          event: req.params.eventId
        });

      if (existingRegistration) {
        return res.status(400).json({
          message: "Already registered for this event"
        });
      }

      const registration = await Registration.create({
        user: req.user.id,
        event: req.params.eventId
      });

      res.status(201).json({
        message: "Event registration successful",
        registration
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  }
);


// ========================================
// VIEW MY REGISTERED EVENTS
// ========================================

router.get(
  "/my",
  authMiddleware,
  async (req, res) => {
    try {
      const registrations = await Registration.find({
        user: req.user.id
      }).populate("event");

      res.json(registrations);
    } catch (error) {
      res.status(500).json({
        message: "Server error"
      });
    }
  }
);


// ========================================
// ADMIN - VIEW ALL REGISTRATIONS
// ========================================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const registrations = await Registration.find()
        .populate("user", "name email")
        .populate("event", "title date location");

      res.json(registrations);
    } catch (error) {
      res.status(500).json({
        message: "Server error"
      });
    }
  }
);


module.exports = router;
