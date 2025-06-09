const { db } = require("../config/firebase");
const { getDateTime } = require('./../utils/dateTime');

const collection = db.collection("service_requests");

async function createRequest(data) {
  const doc = await collection.add({
    ...data,
    status: "pending",
    timestamp: getDateTime(),
    updatedAt: getDateTime(),
  });
  return { id: doc.id };
}

async function getRequestById(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) throw new Error("Request not found");
  return { id: doc.id, ...doc.data() };
}

async function updateRequest(id, updates) {
  await collection.doc(id).update({
    ...updates,
    updatedAt: getDateTime(),
  });
  return { id };
}

async function deleteRequest(id) {
  await collection.doc(id).delete();
  return { id };
}

async function getRequestsByField(field, value) {
  const snapshot = await collection.where(field, "==", value).orderBy("timestamp", "desc").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = {
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
  getRequestsByField,
};
