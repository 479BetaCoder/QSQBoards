"use strict";
//const checkAuth = require("../services/auth-service");
module.exports = function(app) {
  const userController = require("../controllers/user-controller");
  // Route for registering a user
  app
    .route("/users/signup")
    .post(userController.validateUser(), userController.createUser);

  // Route for logging in the registered user
  app.route("/users/login").post(userController.loginUser);

  app.route("/users/:id")
      .put(userController.updateUser);

  // Mock for authenticated routes
  //app.route("/users").get(checkAuth);
};
