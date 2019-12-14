const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String},
    number: { type: String},
    contactMethod: { type: String}
});

module.exports = mongoose.model("Customer", CustomerModel);

