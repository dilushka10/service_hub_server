// src/controllers/feedbackController.js
const service = require("../services/feedbackService");

exports.createFeedback = async (req, res) => {
  try {
    const feedback = await service.addFeedback(req.body);
    res.status(201).json({ message: "Feedback submitted", ...feedback });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await service.getFeedbackById(req.params.id);
    res.json(feedback);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

exports.getProviderFeedbacks = async (req, res) => {
  try {
    const feedbacks = await service.getFeedbacksByProvider(req.params.providerId);
    res.json(feedbacks);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const updated = await service.updateFeedback(req.params.id, req.body);
    res.json({ message: "Feedback updated", ...updated });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const deleted = await service.deleteFeedback(req.params.id);
    res.json({ message: "Feedback deleted", ...deleted });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
