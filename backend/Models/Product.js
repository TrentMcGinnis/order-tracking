const mongoose = require("mongoose");

const ProductModel = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  materials: [{ type: mongoose.Schema.ObjectId, ref: "Material" }],
  cost: { type: Number }
});

module.exports = mongoose.model("Product", ProductModel);
