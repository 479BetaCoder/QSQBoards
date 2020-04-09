"use strict";
module.exports = function (app) {
  //Initialize models
  const userModel = require("./models/user");
  const projectModel = require("./models/project");
  const userStoryModel = require("./models/userStory");
  const taskModel = require("./models/task");

  //Initialize routes
  let userRoutes = require("./routes/user-route");
  let userStoryRoutes = require("./routes/userStory-route");
  let taskRoutes = require("./routes/task-route");
  let projectRoutes = require("./routes/project-route");
  userRoutes(app);
  projectRoutes(app);
  userStoryRoutes(app);
  taskRoutes(app);
};
