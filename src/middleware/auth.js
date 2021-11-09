const jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY
const secured = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = jwt.verify(authorization, key);
    req.id = id;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ ok: false, message: "Unauthorized" });
  }
};
module.exports = { secured };