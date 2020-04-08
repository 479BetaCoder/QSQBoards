"use strict";
module.exports = function (app) {
  const userController = require("../controllers/user-controller"),
    checkAuth = require("../services/auth-service");
  // Route for registering a user
  app
    .route("/users/signup")
    .post(userController.validateUser(), userController.createUser);

  // Route for logging in the registered user
  app.route("/users/login").post(userController.loginUser);

  // Route for updating user details and getting list of registered users
  app
    .route("/users")
    .put(checkAuth, userController.validateUser(), userController.updateUser)
    .get(checkAuth, userController.getUsers);
};
