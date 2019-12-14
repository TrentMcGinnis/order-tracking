const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");

router.get("", ProductController.GetProducts);
router.get("/:id", ProductController.GetProduct)
router.post("", ProductController.PostProduct);
router.delete("/:id", ProductController.DeleteProduct);

module.exports = router;