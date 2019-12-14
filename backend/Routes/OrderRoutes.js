const express = require("express");
const router = express.Router();
const OrderController = require("../Controllers/OrderController");

router.get("", OrderController.GetOrders);
router.get("/:id", OrderController.GetOrder)
router.post("", OrderController.PostOrder);
router.delete("/:id", OrderController.DeleteOrder);

module.exports = router;