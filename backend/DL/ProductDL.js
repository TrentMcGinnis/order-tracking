const Product = require("../Models/Product");

module.exports = {
  Get: function Get(productID, callback) {
    if (!productID) {
      Product.find()
        .then(products => {
          callback(null, products);
        })
        .catch(e => {
          callback(e.message, null);
        });
    } else {
      Product.findById(productID)
        .then(product => {
          callback(null, product);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Post: function Post(product, callback) {
    if (product) {
      let newProduct = Product({
        name: product.name,
        quantity: product.quantity,
        materials: product.materials,
        cost: product.cost
      });
      newProduct
        .save()
        .then(product => {
          callback(null, product);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Delete: function Delete(productID, callback) {
    Product.findByIdAndDelete(productID)
      .then(res => {
        callback(null, res);
      })
      .catch(e => {
        callback(e.message, null);
      });
  }
};
