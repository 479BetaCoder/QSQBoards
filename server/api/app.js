"use strict";
module.exports = function(app) {
  //Initialize models
  const userModel = require("./models/user");
    let projectModel = require('./models/project');

    //Initialize routes
    let userRoutes = require('./routes/user-route');
    let taskRoutes = require('./routes/task-route');
    let projectRoutes = require('./routes/project-route');
    userRoutes(app);
    projectRoutes(app);
};