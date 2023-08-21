const Post = require("../models/post.model")

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author")

  res.send(posts)
}

const getPost = (req, res) => {

}

const createPost = async (req, res) => {
  const { title, content, author } = req.body;

  const post = new Post({
    author,
    content,
    title
  })

  await post.save()
  res.send(post)
}

const addComment = async (req, res) => {
  const { postId } = req.params
  const { author, content } = req.body;

  const post = await Post.findByIdAndUpdate(postId, {
    $push: { comments: { author, content } }
  })

}

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  addComment
}