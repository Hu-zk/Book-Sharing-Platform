const express = require("express");
const router = express.Router()
const bookControllers = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const picture_uploader =require("../middlewares/picture_uploader")

router.get("/",authMiddleware, bookControllers.getAllPosts)
router.post("/",authMiddleware,picture_uploader.upload.single("image"), bookControllers.createBook)

router.get("/feed", authMiddleware, bookControllers.getFeed);
router.post("/:bookId/togglelike", authMiddleware, bookControllers.toggleLikeBook);
router.post("/:bookId/like", authMiddleware, bookControllers.likeBook);
router.post("/:bookId/unlike", authMiddleware, bookControllers.unlikeBook);
router.get('/:bookId/isliked', authMiddleware, bookControllers.checkIfBookIsLiked);
router.get("/recommended", authMiddleware, bookControllers.getRecommendedBooks);
router.get("/search", bookControllers.searchBooks);
router.get("/:id",authMiddleware, bookControllers.getPost)

module.exports = router