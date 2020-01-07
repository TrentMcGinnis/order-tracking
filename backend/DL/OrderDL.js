const Order = require("../Models/Order");
const CustomerDL = require("./CustomerDL");

module.exports = {
  Get: function Get(orderID, userID, callback) {
    let returnOrders = [];
    if (!orderID) {
        Order.find({ userID: userID })
        .then(orders => {
          for(let i = 0; i < orders.length; i++) {
            CustomerDL.Get(orders[i].customerID, userID, (err, res) => {
              if (!err) {
                returnOrders.push({
                  _id: orders[i]._id,
                  products: orders[i].products,
                  customerID: orders[i].customerID,
                  userID: orders[i].userID,
                  dueDate: orders[i].dueDate,
                  amount: orders[i].amount,
                  Customer: res,
                  __v: orders[i].__V
                });
              } else {
                throw new Error(err);
              }
            });
          };
          callback(null, returnOrders);
        })
        .catch(e => {
          callback(e.message, null);
        });
    } else {
        Order.findById(orderID)
        .then(order => {
          CustomerDL.Get(order.customerID, userID, (err, res) => {
            if (!err) {
              order.Customer = res;
            } else {
              throw new Error(err);
            }
          });
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
        customerID: order.customerID,
        userID: order.userID,
        products: order.products,
        dueDate: order.dueDate,
        amount: order.amount
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
