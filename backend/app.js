const express = require('express');
const bodyparser = require('body-parser');
const app = express();
require('dotenv').config()
require('./db')

const CustomerRoutes = require("./Routes/CustomerRoutes");

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

module.exports = app;
