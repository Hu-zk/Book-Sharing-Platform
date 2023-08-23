const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware")


router.get("/", usersController.getAllUsers)
router.post("/:userId/toggle-follow", authMiddleware, usersController.toggleFollow);

router.get("/profile", usersController.getProfile)

module.exports = router;