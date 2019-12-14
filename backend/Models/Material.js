const mongoose = require("mongoose");

const MaterialModel = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: {type: Number, required: true}
});

module.exports = mongoose.model("Material", MaterialModel);

