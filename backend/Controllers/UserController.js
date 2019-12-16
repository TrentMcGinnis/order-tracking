const UserDL = require("../DL/UserDL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  GetUser: function GetUser(req, res, next) {
    UserDL.Get(req.params.id, (err, user) => {
      if (!err) {
        res.status(200).json({
          User: user
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  GetUsers: function GetUsers(req, res, next) {
    UserDL.Get(undefined, (err, users) => {
      if (!err) {
        res.status(200).json({
          Users: users
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  PostUser: function PostUser(req, res, next) {
    UserDL.Post(req.body.user, (err, user) => {
      if (!err) {
        res.status(200).json({
          User: user
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  PatchUser: function PatchUser(req, res, next) {
    UserDL.Patch(req.body.user, (err, user) => {
      if (!err) {
        res.status(200).json({
          User: user
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  DeleteUser: function DeleteUser(req, res, next) {
    UserDL.Delete(req.params.id, (err, result) => {
      if (!err) {
        res.status(204).json({
          message: "User deleted."
        });
      } else {
        res.status(500).json({
          message: err
        });
      }
    });
  },
  LoginUser: function LoginUser(req, res, next) {
    let fetchedUser;
    UserDL.GetUserByEmail(req.body.user.email, (err, user) => {
      if (!err) {
        fetchedUser = user;
      } else {
        res.status(500).json({
          message: err
        });
      }
      if (bcrypt.compare(req.body.user.password, fetchedUser.password)) {
        const token = jwt.sign(
          { email: fetchedUser.email, userid: fetchedUser._id },
          process.env.TOKEN_SIGN,
          { expiresIn: "24h" }
        );
        res.status(200).json({
          token: token,
          userID: fetchedUser._id
        });
      } else {
        res.status(404).json({
          message: "Authentication Failed"
        });
      }
    });
  }
};
