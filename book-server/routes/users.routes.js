const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware")


router.post("/:userId/toggle-follow", authMiddleware, usersController.toggleFollow);

module.exports = router;