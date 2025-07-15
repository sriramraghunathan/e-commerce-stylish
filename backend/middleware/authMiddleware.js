// middlewares/authMiddleware.js (Option 2 - Firebase Token Only)

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const isAdmin = req.headers.isadmin === "true";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Skip actual JWT verification for Firebase token
  req.user = { isAdmin };
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Admin access required" });
  }
};

module.exports = { verifyToken, isAdmin };
