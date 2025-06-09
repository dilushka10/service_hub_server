const { db } = require("../config/firebase");
const { getDateTime } = require("../utils/dateTime");
const collection = db.collection("payments");

async function createPayment(data) {
  const doc = await collection.add({
    ...data,
    payment_status: "pending",
    createdAt: getDateTime(),
    updatedAt: getDateTime(),
  });
  return { id: doc.id };
}

async function updatePayment(id, updates) {
  await collection.doc(id).update({
    ...updates,
    updatedAt: getDateTime(),
  });
  return { id };
}

async function getPayment(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) throw new Error("Not found");
  return { id: doc.id, ...doc.data() };
}

async function getPaymentsByUser(userId) {
  const snapshot = await collection.where("userId", "==", userId).orderBy("createdAt", "desc").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = { createPayment, updatePayment, getPayment, getPaymentsByUser };
