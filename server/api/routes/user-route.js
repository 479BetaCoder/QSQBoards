"use strict";
module.exports = function(app) {
  const userController = require("../controllers/user-controller");
  // Route for registering a user
  app
    .route("/users/signup")
    .post(userController.validate("createUser"), userController.createUser);
};
