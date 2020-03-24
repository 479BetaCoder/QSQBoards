/**
 * Service for user operations.
 */

"use strict";
const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  utilConstants = require("../utils/Constants"),
  User = mongoose.model("Users");

/**
 * Registers a user
 *
 * @param {Object} newUser {user object}
 */
exports.createUser = function(newUser) {
  const hash = bcrypt.hashSync(newUser.password, utilConstants.SALT_ROUNDS);
  const user = new User({
    emailId: newUser.emailId,
    password: hash
  });
  const promise = user.save();
  return promise;
};
