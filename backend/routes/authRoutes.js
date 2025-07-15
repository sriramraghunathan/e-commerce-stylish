const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  // Replace this with DB validation later
  if (email === "admin@example.com" && password === "1234") {
    const token = jwt.sign(
      { email: email, isAdmin: true },
      process.env.JWT_SECRET || "your-secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, isAdmin: true });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
