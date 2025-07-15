const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllProducts);

// Protected routes (admin only)
router.post("/add", verifyToken, isAdmin, addProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
