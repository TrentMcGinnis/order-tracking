const MaterialDL = require("../DL/MaterialDL");

module.exports = {
  GetMaterial: function GetMaterial(req, res, next) {
    MaterialDL.Get(req.params.id, (err, material) => {
      if (!err) {
        res.status(200).json({
          Material: material
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  GetMaterials: function GetMaterials(req, res, next) {
    MaterialDL.Get(undefined, (err, materials) => {
      if (!err) {
        res.status(200).json({
          Materials: materials
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  PostMaterial: function PostMaterial(req, res, next) {
    MaterialDL.Post(req.body.material, (err, material) => {
      if (!err) {
        res.status(200).json({
          Material: material
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  DeleteMaterial: function DeleteMaterial(req, res, next) {
    MaterialDL.Delete(req.params.id, (err, result) => {
      if (!err) {
        res.status(204).json({
          message: "Material deleted."
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    })
  }
};
