const express = require("express");
const router = express.Router();
const { createOrUpdateUser } = require("../services/userService");
const verifyToken = require("../middlewares/auth");

const { updateUser, deleteUser } = require("../controllers/userController");

router.put("/:uid", updateUser);
router.delete("/:uid", deleteUser);

module.exports = router;
