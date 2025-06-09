const { db } = require("../config/firebase");
const { getDateTime } = require("../utils/dateTime");
const collection = db.collection("categories");

// Create category
async function createCategory(data) {
  const newDoc = await collection.add({
    ...data,
    createdAt: getDateTime(),
  });
  const newData = await newDoc.get();
  return { id: newDoc.id, ...newData.data() };
}

// Get all categories
async function getAllCategories() {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get one category
async function getCategoryById(id) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) throw new Error("Category not found");
  return { id: doc.id, ...doc.data() };
}

// Update category
async function updateCategory(id, data) {
  await collection.doc(id).update(data);
  return getCategoryById(id);
}

// Delete category
async function deleteCategory(id) {
  await collection.doc(id).delete();
  return { message: `Category ${id} deleted` };
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
