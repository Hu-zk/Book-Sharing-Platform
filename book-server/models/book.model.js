const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commented_user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  author: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  picture: String,
  review: String,
  genre: 
  {
    type:String,
    enum:["Action","Commedy","Fantasy"]
  },

  liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [commentSchema],
  posted_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

bookSchema.index({title:1})
const Book = mongoose.model("book", bookSchema);
bookSchema.index({ title: "text", author: "text", review: "text" })
module.exports = Book;
