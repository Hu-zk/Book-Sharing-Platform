// const connection = require("../configs/db.connection")
const bcrypt = require("bcrypt")
const User = require("../models/user.model")

const getAllUsers = async (req, res) => {
  // connection.query("SELECT * FROM USERS", (err, result) => {
  //   if (err) console.log(err)

  //   res.send(result)
  // });

  const users = await User.find();
  res.send(users)
}

const getUser = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  // connection.query(`SELECT * FROM USERS WHERE id = ?`, [id], (err, result) => {
  //   if (err) console.log(err)
  //   if (result.length === 0) res.status(404).send({ message: "User not found" })
  //   res.send(result[0])
  // })

  const user = await User.findById(id).select("-password")
  res.send(user)
}

const createUser = async (req, res) => {
  const { password, first_name, last_name, email } = req.body

  const hashedPassword = await bcrypt.hash(password, 10);
  // connection.query("INSERT INTO USERS (first_name, last_name, email, password) VALUES (?, ?, ?, ?)", [first_name, last_name, email, hashedPassword], (err, result) => {
  //   if (err) console.log(err)

  //   if (result.insertId) {
  //     connection.query(`SELECT * FROM USERS WHERE id = ?`, [result.insertId], (err, result) => {
  //       if (err) console.log(err)
  //       res.send(result[0])
  //     })
  //   }
  // })

  const user = new User({
    email,
    password: hashedPassword,
    first_name,
    last_name
  })
  await user.save();

  res.send(user)

}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  if (last_name !== "") dataToUpade.last_name = last_name
  const user = await User.findByIdAndUpdate(id, {
    $set: { first_name, last_name },

  }, {
    new: true
  })

  res.send(user)
}

const deleteUser = (req, res) => {
  res.send("delete user")
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}