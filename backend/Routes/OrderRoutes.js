const express = require("express");
const router = express.Router();

const OrderController = require("../Controllers/OrderController");
const auth = require("../Middleware/Auth");

router.get("", auth, OrderController.GetOrders);
router.get("/:id", auth, OrderController.GetOrder)
router.post("", auth, OrderController.PostOrder);
router.delete("/:id", auth, OrderController.DeleteOrder);

module.exports = router;