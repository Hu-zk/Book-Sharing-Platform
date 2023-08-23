const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: 
  {
    type:String,
    enum:["Action","Comedy","Fantasy"]
  },
  author: String,
  image: String,
  review: String,

  liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  posted_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
}, { timestamps: true });

bookSchema.index({ title: 1 });
bookSchema.index({ title: "text", author: "text", review: "text" });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
