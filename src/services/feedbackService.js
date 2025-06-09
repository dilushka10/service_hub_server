// src/services/feedbackService.js
const { db } = require("../config/firebase");
const { getDateTime } = require("../utils/dateTime");

const collection = db.collection("feedbacks");

async function addFeedback(data) {
  const doc = await collection.add({
    ...data,
    createdAt: getDateTime(),
    updatedAt: getDateTime(),
  });
  return { id: doc.id };
}

async function getFeedbackById(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) throw new Error("Feedback not found");
  return { id: doc.id, ...doc.data() };
}

async function getFeedbacksByProvider(providerId) {
  const snapshot = await collection
    .where("providerId", "==", providerId)
    .orderBy("createdAt", "desc")
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function updateFeedback(id, updates) {
  await collection.doc(id).update({
    ...updates,
    updatedAt: new Date()
  });
  return { id };
}

async function deleteFeedback(id) {
  await collection.doc(id).delete();
  return { id };
}

module.exports = {
  addFeedback,
  getFeedbackById,
  getFeedbacksByProvider,
  updateFeedback,
  deleteFeedback
};
