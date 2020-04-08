"use strict";
module.exports = function (app) {
  const userController = require("../controllers/user-controller");
  // Route for registering a user
  app
    .route("/users/signup")
    .post(userController.validateUser(), userController.createUser);

  // Route for logging in the registered user
  app.route("/users/login").post(userController.loginUser);

  app.route("/users").put(userController.updateUser);
};
