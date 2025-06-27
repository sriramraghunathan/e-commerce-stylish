// File: routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
} = require("../controllers/productController");

// POST /api/products/add
router.post("/add", addProduct);

// GET /api/products
router.get("/", getAllProducts);

module.exports = router;
