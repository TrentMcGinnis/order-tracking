const express = require("express");
const router = express.Router();
const CustomerController = require("../Controllers/CustomerController");

router.get("", CustomerController.GetCustomers);
router.get("/:id", CustomerController.GetCustomer)
router.post("", CustomerController.PostCustomer);
router.delete("/:id", CustomerController.DeleteCustomer);

module.exports = router;