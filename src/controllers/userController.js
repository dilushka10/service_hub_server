const {
  updateUserById,
  deleteUserById,
} = require("../services/userService");

// PUT /api/users/:uid
async function updateUser(req, res) {
  const { uid } = req.params;
  const updateData = req.body;

  try {
    const updated = await updateUserById(uid, updateData);
    res.json({ message: "User updated", data: updated });
  } catch (err) {
    console.error("Update Error:", err.message);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
}

// DELETE /api/users/:uid
async function deleteUser(req, res) {
  const { uid } = req.params;

  try {
    const result = await deleteUserById(uid);
    res.json(result);
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
}

module.exports = {
  updateUser,
  deleteUser,
};
