const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Routes
router.post("/add", productController.addProduct);
router.get("/", productController.getAllProducts);
router.put("/:id", productController.updateProduct); // 🔧 For edit
router.delete("/:id", productController.deleteProduct); // 🗑️ For delete

module.exports = router;
