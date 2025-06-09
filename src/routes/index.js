const express = require("express");
const router = express.Router();

router.use("/users", require("./userRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/test", require("./testRoutes"));
router.use("/categories", require("./categoryRoutes"));
router.use("/requests", require("./requestRoutes"));
router.use("/payments", require("./paymentRoutes"));
router.use("/feedbacks", require("./feedbackRoutes"));

module.exports = router;
