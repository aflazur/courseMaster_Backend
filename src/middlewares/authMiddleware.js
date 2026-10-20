// middleware to authenticate JWT tokens

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch {
    // invalid or expired token: never let the request through
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
