const express = require("express");

const Event = require("../models/Event");

const {
  authMiddleware,
  adminMiddleware
} = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// GET ALL EVENTS
// ========================================

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});


// ========================================
// GET SINGLE EVENT
// ========================================

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});


// ========================================
// CREATE EVENT - ADMIN
// ========================================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const {
        title,
        description,
        date,
        location,
        category,
        organizer
      } = req.body;

      const event = await Event.create({
        title,
        description,
        date,
        location,
        category,
        organizer
      });

      res.status(201).json({
        message: "Event created successfully",
        event
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
// UPDATE EVENT - ADMIN
// ========================================

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

      if (!event) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      res.json({
        message: "Event updated successfully",
        event
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error"
      });
    }
  }
);


// ========================================
// DELETE EVENT - ADMIN
// ========================================

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);

      if (!event) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      res.json({
        message: "Event deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error"
      });
    }
  }
);


module.exports = router;