const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()
const bookControllers = require("../controllers/book.controller");
const picture_uploader =require("../middlewares/picture_uploader")

router.get("/",authMiddleware, bookControllers.getAllPosts)
router.post("/",authMiddleware,picture_uploader.upload.single("image"), bookControllers.createBook)

router.get("/feed", authMiddleware, bookControllers.getFeed);
router.post("/:bookId/toggle-like", authMiddleware, bookControllers.toggleLikeBook);
router.get("/search/:searchText",authMiddleware, bookControllers.searchBooks);


module.exports = router