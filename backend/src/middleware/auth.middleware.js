const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.JWT_TOKEN;

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      res.status(401).json({ message: "Not Authorized"})
    }

    req.user = decoded; // payload save
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = protect;