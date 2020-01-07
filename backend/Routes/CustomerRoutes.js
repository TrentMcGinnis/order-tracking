const express = require("express");
const router = express.Router();

const CustomerController = require("../Controllers/CustomerController");
const auth = require("../Middleware/Auth");

router.get("", auth, CustomerController.GetCustomers);
router.get("/:id", auth, CustomerController.GetCustomer);
router.post("", auth, CustomerController.PostCustomer);
router.delete("/:id", auth, CustomerController.DeleteCustomer);

module.exports = router;
