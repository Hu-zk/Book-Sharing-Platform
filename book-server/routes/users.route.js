const express = require("express");
const router = express.Router()
const userControllers = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware")


router.get("/", authMiddleware, userControllers.getAllUsers)
router.get("/:id", userControllers.getUser)
router.post("/", userControllers.createUser)
router.put("/:id", userControllers.updateUser)
router.delete("/:id", userControllers.deleteUser)


module.exports = router