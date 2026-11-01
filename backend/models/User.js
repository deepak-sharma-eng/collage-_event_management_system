const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },

    studentId: {
      type: String,
      required: function () { return this.role === "student"; },
      trim: true,
      uppercase: true,
      unique: true,
      sparse: true
    },

    department: {
      type: String,
      required: function () { return this.role === "student"; },
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
