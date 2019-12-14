const express = require("express");
const router = express.Router();
const MaterialController = require("../Controllers/MaterialController");

router.get("", MaterialController.GetMaterials);
router.get("/:id", MaterialController.GetMaterial)
router.post("", MaterialController.PostMaterial);
router.delete("/:id", MaterialController.DeleteMaterial);

module.exports = router;