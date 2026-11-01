const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  studentId: user.studentId,
  department: user.department
});

const normaliseEmail = (email) => email.trim().toLowerCase();

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, studentId, department } = req.body;

    // Validate required fields
    if (!name || !email || !password || !studentId || !department) {
      return res.status(400).json({
        message: "Name, email, student ID, department and password are required"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const cleanedEmail = normaliseEmail(email);

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: cleanedEmail }, { studentId: studentId.trim().toUpperCase() }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: cleanedEmail,
      password: hashedPassword,
      role: "student",
      studentId,
      department
    });

    // Send response
    res.status(201).json({
      message: "Registration successful",
      user: publicUser(user)
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ email: normaliseEmail(email) });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    if (role && !["student", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid login category" });
    }

    if (role && user.role !== role) {
      return res.status(403).json({
        message: `This account is registered as a ${user.role}. Please select the correct login category.`
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Authentication service is not configured" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: publicUser(user)
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch user profile" });
  }
};
