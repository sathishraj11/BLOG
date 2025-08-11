const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {id:verified.id};
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
