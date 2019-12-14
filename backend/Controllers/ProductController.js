const ProductDL = require("../DL/ProductDL");

module.exports = {
  GetProduct: function GetProduct(req, res, next) {
    ProductDL.Get(req.params.id, (err, product) => {
      if (!err) {
        res.status(200).json({
          Product: product
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  GetProducts: function GetProducts(req, res, next) {
    ProductDL.Get(undefined, (err, products) => {
      if (!err) {
        res.status(200).json({
          Products: products
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  PostProduct: function PostProduct(req, res, next) {
    ProductDL.Post(req.body.order, (err, product) => {
      if (!err) {
        res.status(200).json({
          Product: product
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  DeleteProduct: function DeleteProduct(req, res, next) {
    ProductDL.Delete(req.params.id, (err, result) => {
      if (!err) {
        res.status(204).json({
          message: "Product deleted."
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    })
  }
};
