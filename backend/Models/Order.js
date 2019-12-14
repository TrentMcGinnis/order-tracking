const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema({
  Customer: { type: mongoose.Schema.ObjectId, ref: "Customer" },
  Products: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  dueDate: { type: String, required: true}, 
  cost: { type: Number, required: true }
});

module.exports = mongoose.model("Order", OrderModel);
