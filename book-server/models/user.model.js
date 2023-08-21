const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: "Custom: Email is required"
  },
  password: String,
  first_name: String,
  last_name: String
})

const model = mongoose.model("User", userSchema)
module.exports = model;