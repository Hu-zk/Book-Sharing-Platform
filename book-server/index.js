const express = require("express");
const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
const cors = require("cors");
require("dotenv").config()

app.use(cors());
app.use(express.json())

const authMiddleware = require("./middlewares/auth.middleware");

const usersRouter = require("./routes/users.routes");
app.use("/users", authMiddleware, usersRouter)

const authRouter = require("./routes/auth.routes")
app.use("/auth", authRouter)

app.use('/images', express.static('images/post_images'));

const booksRouter = require("./routes/book.route")
app.use("/books", booksRouter)

app.listen(8000, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log("server running on port: ", 8000)
    mongooseConnect()
})