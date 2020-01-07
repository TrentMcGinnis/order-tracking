const User = require("../Models/User");
const bcrypt = require("bcrypt");

module.exports = {
  Get: function Get(userID, callback) {
    if (!userID) {
      User.find()
        .then(users => {
          users = users.map(user => {
            return {_id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email}
          });
          callback(null, users);
        })
        .catch(e => {
          callback(e.message, null);
        });
    } else {
      User.findById(userID)
        .then(user => {
          user = {
            _id: user._id,
            first_name: user.first_name, 
            last_name: user.last_name, 
            email: user.email
          }
          callback(null, user);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Post: function Post(user, callback) {
    if (user) {
      bcrypt
        .hash(user.password, 10)
        .then(hash => {
          const newUser = User({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: hash
          });
          newUser.save().then(user => {
            user = {
              _id: user._id,
              first_name: user.first_name, 
              last_name: user.last_name, 
              email: user.email
            }
            callback(null, user);
          });
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Patch: function Patch(user, callback) {
    if (user) {
      User.findOneAndUpdate({_id: user._id}, user, () => {})
        .then(updatedUser => {
          updatedUser = {
            _id: updatedUser._id,
            first_name: updatedUser.first_name, 
            last_name: updatedUser.last_name, 
            email: updatedUser.email
          }
          callback(null, updatedUser);
        })
        .catch(e => {
          callback(e.message, null);
        });
    }
  },
  Delete: function Delete(userID, callback) {
    User.findByIdAndDelete(userID)
      .then(res => {
        callback(null, res);
      })
      .catch(e => {
        callback(e.message, null);
      });
  },
  GetUserByEmail: function GetUserByEmail(email, callback) {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          callback(null, user);
        } else {
          callback("User not found", null);
        }
      })
      .catch(e => {
        callback(e.message, null);
      });
  }
};
