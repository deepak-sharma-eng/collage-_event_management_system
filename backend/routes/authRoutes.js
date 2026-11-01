const express = require("express");
const { register, login, me } = require("../controllers/authConroller");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Public registration is deliberately student-only. Admin accounts must be
// provisioned separately so a visitor cannot grant themselves admin access.
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;
