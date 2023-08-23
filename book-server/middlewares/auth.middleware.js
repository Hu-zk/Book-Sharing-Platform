const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).send({message: "NO token"});

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()

    } catch (error) {
        console.log(error);
        res.status(401).send({message: "Unauthorized"})
    }
}

module.exports = authMiddleware