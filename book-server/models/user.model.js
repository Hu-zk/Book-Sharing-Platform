const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  liked_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }]
});

const User = mongoose.model("user", userSchema);

module.exports = User;
