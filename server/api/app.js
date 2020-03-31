"use strict";
module.exports = function(app) {
  //Initialize models
  const userModel = require("./models/user");

  //Initialize routes
  const userRoutes = require("./routes/user-route");
  userRoutes(app);
};
