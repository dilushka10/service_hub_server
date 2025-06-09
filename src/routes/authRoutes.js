const express = require("express");
const router = express.Router();
const { register, signIn } = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", register);
router.post("/signin", signIn);

module.exports = router;
