const express = require("express");
const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
require("dotenv").config()

app.use(express.json())

const authMiddleware = require("./middlewares/auth.middleware");

const authRouter = require("./routes/auth.routes")
app.use("/auth", authRouter)

const usersRouter = require("./routes/users.routes");
app.use("/users", authMiddleware, usersRouter)

const staysRouter = require("./routes/stays.routes");
app.use("/stays", staysRouter)

app.listen(8000, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log("server running on port: ", 8000)
    mongooseConnect()
})