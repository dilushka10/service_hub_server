const express = require("express");
const router = express.Router();
require('dotenv').config();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Service Hub Server" });
});

router.use("/users", require("./userRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/test", require("./testRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/requests", require("./requestRoutes"));
router.use("/payments", require("./paymentRoutes"));
router.use("/feedbacks", require("./feedbackRoutes"));

module.exports = router;
