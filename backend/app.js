const express = require('express');
const bodyparser = require('body-parser');
const app = express();
require('dotenv').config()
require('./db')

const CustomerRoutes = require("./Routes/CustomerRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const MaterialRoutes = require("./Routes/MaterialRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const UserRoutes = require("./Routes/UserRoutes");

app.use(bodyparser.json());

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers",
   "Origin,X-Requested-With, Content-Type, Accept, Authorization");
   res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
   );
  next();
});

app.use("/api/customers", CustomerRoutes);
app.use("/api/products", ProductRoutes)
app.use("/api/orders", OrderRoutes)
app.use("/api/materials", MaterialRoutes)
app.use("/api/users", UserRoutes)

module.exports = app;
