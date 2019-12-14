const OrderDL = require("../DL/OrderDL");

module.exports = {
  GetOrder: function GetOrder(req, res, next) {
    OrderDL.Get(req.params.id, (err, order) => {
      if (!err) {
        res.status(200).json({
          Order: order
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  GetOrders: function GetOrders(req, res, next) {
    OrderDL.Get(undefined, (err, orders) => {
      if (!err) {
        res.status(200).json({
          Orders: orders
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  PostOrder: function PostOrder(req, res, next) {
    OrderDL.Post(req.body.order, (err, order) => {
      if (!err) {
        res.status(200).json({
          Order: order
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  DeleteOrder: function DeleteOrder(req, res, next) {
    OrderDL.Delete(req.params.id, (err, result) => {
      if (!err) {
        res.status(204).json({
          message: "Order deleted."
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    })
  }
};
