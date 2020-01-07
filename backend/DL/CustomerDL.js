const Customer = require("../Models/Customer");

module.exports = {
  Get: function Get(customerID, userID, callback) {
    if (!customerID) {
      Customer.find({ userID: userID })
        .sort({ name: 1 })
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
        first_name: customer.first_name,
        last_name: customer.last_name,
        company_name: customer.company_name,
        email: customer.email,
        phone: customer.phone,
        contactMethod: customer.contactMethod,
        userID: customer.userID,
        street: customer.street,
        city: customer.city,
        state: customer.state,
        postal: customer.postal
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
