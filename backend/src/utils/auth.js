const jwt = require("jsonwebtoken");
const config = require("./config");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401).json({ error: "Unathorized" });
  }

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden." });
  }
};

module.exports = verifyToken;
