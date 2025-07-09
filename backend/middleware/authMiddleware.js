const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "your_jwt_secret_key");
    if (!decoded.isAdmin)
      return res.status(403).json({ message: "Not authorized as admin" });

    req.user = decoded;
    next(); // Proceed to the route
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
