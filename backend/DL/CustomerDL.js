const Customer = require("../Models/Customer");

module.exports = {
  Get: function Get(customerID, callback) {
    if (!customerID) {
      Customer.find()
        .then(customers => {
          callback(null, customers);
        })
        .catch(e => {
          callback(e.message, null);
        });
    } else {
      Customer.findById(customerID)
        .then(customer => {
          callback(null, customer);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Post: function Post(customer, callback) {
    if (customer) {
      let newCustomer = Customer({
        name: customer.name,
        email: customer.email,
        number: customer.number,
        contactMethod: customer.contactMethod
      });
      newCustomer
        .save()
        .then(customer => {
          callback(null, customer);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Delete: function Delete(customerID, callback) {
    Customer.findByIdAndDelete(customerID)
      .then(res => {
        callback(null, res);
      })
      .catch(e => {
        callback(e.message, null);
      });
  }
};
