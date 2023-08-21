const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) return res.status(401).send({ message: 'Unauthorized' })

  try {
    jwt.verify(token, process.env.SERCRET_KEY);
    next();

  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

}

module.exports = authMiddleware