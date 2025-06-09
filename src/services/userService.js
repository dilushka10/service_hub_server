const { admin, db } = require("../config/firebase");

/**
 * Update Firestore user profile
 */
async function updateUserById(uid, updateData) {
  await db.collection("users").doc(uid).update(updateData);
  return { uid, ...updateData };
}

/**
 * Delete user from Firestore + Firebase Auth
 */
async function deleteUserById(uid) {
  // Delete from Firebase Auth
  await admin.auth().deleteUser(uid);

  // Delete from Firestore
  await db.collection("users").doc(uid).delete();

  return { message: `User ${uid} deleted successfully.` };
}

module.exports = {
  updateUserById,
  deleteUserById,
};
