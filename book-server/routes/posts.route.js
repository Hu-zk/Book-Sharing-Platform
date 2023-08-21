const express = require("express");
const router = express.Router()
const postControllers = require("../controllers/posts.controller");


router.get("/", postControllers.getAllPosts)
router.get("/:id", postControllers.getPost)
router.post("/:postId/addcomment", postControllers.addComment)
router.post("/", postControllers.createPost)


module.exports = router