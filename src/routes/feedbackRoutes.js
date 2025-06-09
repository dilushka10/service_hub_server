// src/routes/feedbackRoutes.js
const router = require("express").Router();
const ctrl = require("../controllers/feedbackController");

router.post("/", ctrl.createFeedback);
router.get("/:id", ctrl.getFeedback);
router.get("/provider/:providerId", ctrl.getProviderFeedbacks);
router.put("/:id", ctrl.updateFeedback);
router.delete("/:id", ctrl.deleteFeedback);

module.exports = router;
