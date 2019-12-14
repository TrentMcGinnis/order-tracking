const Material = require("../Models/Material");

module.exports = {
  Get: function Get(materialID, callback) {
    if (!materialID) {
        Material.find()
        .then(materials => {
          callback(null, materials);
        })
        .catch(e => {
          callback(e.message, null);
        });
    } else {
        Material.findById(materialID)
        .then(material => {
          callback(null, material);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Post: function Post(material, callback) {
    if (material) {
      let newMaterial = Material({
        name: material.name,
        quantity: material.quantity
      });
      newMaterial
        .save()
        .then(material => {
          callback(null, material);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Delete: function Delete(materialID, callback) {
    Material.findByIdAndDelete(materialID)
      .then(res => {
        callback(null, res);
      })
      .catch(e => {
        callback(e.message, null);
      });
  }
};
