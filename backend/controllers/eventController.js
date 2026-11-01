const Event = require("../models/Event");

// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// READ ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// READ SINGLE EVENT
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE EVENT
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};