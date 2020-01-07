const express = require("express");
const router = express.Router();

const auth = require("../Middleware/Auth");

const UserController = require("../Controllers/UserController");

router.get("", auth, UserController.GetUsers);
router.get("/:id", auth, UserController.GetUser)
router.post("/login", UserController.LoginUser)
router.post("", UserController.PostUser);
router.patch("/:id", auth, UserController.PatchUser)
router.delete("/:id", auth, UserController.DeleteUser);

module.exports = router;