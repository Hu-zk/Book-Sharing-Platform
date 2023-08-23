const express = require("express");
const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
const authMiddleware = require("./middlewares/auth.middleware");
const cors = require("cors");
require("dotenv").config()

app.use(cors());
app.use(express.json({ limit: '10mb' }))

const authRouter = require("./routes/auth.routes")
app.use("/auth", authRouter)

const usersRouter = require("./routes/users.routes");
app.use("/users", authMiddleware, usersRouter)

app.use('/images', express.static('images'));


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