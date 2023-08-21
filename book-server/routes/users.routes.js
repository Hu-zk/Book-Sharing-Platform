const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/", usersController.getAllUsers)
router.get("/profile", usersController.getProfile)

module.exports = router;