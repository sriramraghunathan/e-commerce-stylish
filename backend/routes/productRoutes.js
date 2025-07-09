const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const verifyToken = require("../middleware/authMiddleware");

// 🔐 Protect POST/PUT/DELETE with token
router.post("/add", verifyToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error adding product" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating product" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product" });
  }
});

// Public GET
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
