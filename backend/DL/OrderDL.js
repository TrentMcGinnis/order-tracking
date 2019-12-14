const Order = require("../Models/Order");

module.exports = {
  Get: function Get(orderID, callback) {
    if (!orderID) {
        Order.find()
        .then(orders => {
          callback(null, orders);
        })
        .catch(e => {
          callback(e.message, null);
        });
    } else {
        Order.findById(orderID)
        .then(order => {
          callback(null, order);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Post: function Post(order, callback) {
    if (order) {
      let newOrder = Order({
        Customer: order.customerID,
        Products: order.products,
        dueDate: order.dueDate,
        cost: order.cost
      });
      newOrder
        .save()
        .then(order => {
          callback(null, order);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Delete: function Delete(orderID, callback) {
    Order.findByIdAndDelete(orderID)
      .then(res => {
        callback(null, res);
      })
      .catch(e => {
        callback(e.message, null);
      });
  }
};
