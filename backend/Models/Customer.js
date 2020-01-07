const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    company_name: { type: String },
    email: { type: String},
    phone: { type: String},
    contactMethod: { type: String},
    userID: { type: mongoose.Schema.ObjectId, ref: "User" },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postal: { type: String }
});

module.exports = mongoose.model("Customer", CustomerModel);

