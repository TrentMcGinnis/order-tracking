const CustomerDL = require("../DL/CustomerDL");

module.exports = {
  GetCustomer: function GetCustomer(req, res, next) {
    CustomerDL.Get(req.params.id, req.userData.id, (err, customer) => {
      if (!err) {
        res.status(200).json({
          Customer: customer
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  GetCustomers: function GetCustomers(req, res, next) {
    CustomerDL.Get(undefined, req.userData.id, (err, customers) => {
      if (!err) {
        res.status(200).json({
          Customers: customers
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  PostCustomer: function PostCustomer(req, res, next) {
    req.body.customer.userID = req.userData.id;
    CustomerDL.Post(req.body.customer, (err, customer) => {
      if (!err) {
        res.status(200).json({
          Customer: customer
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  DeleteCustomer: function DeleteCustomer(req, res, next) {
    CustomerDL.Delete(req.params.id, (err, result) => {
      if (!err) {
        res.status(204).json({
          message: "Customer deleted."
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    })
  }
};
