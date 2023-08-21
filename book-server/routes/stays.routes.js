const express = require("express");
const router = express.Router();
const staysController = require("../controllers/stays.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/:id?", staysController.getStays)
router.get("/me", authMiddleware, staysController.getMyStays)

module.exports = router;