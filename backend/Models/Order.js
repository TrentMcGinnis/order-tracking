const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema({
  customerID: { type: mongoose.Schema.ObjectId, ref: "Customer" },
  userID: { type: mongoose.Schema.ObjectId, ref: "User" },
  products: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  dueDate: { type: Date, required: true}, 
  amount: { type: Number, required: true }
});

module.exports = mongoose.model("Order", OrderModel);
