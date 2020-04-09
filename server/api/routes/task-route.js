/**
 * Tasks endpoint route definitions.
 */

"use strict";
module.exports = function (app) {
  const taskController = require("../controllers/task-controller"),
    checkAuth = require("../services/auth-service");
  // Task Routes for createing
  app.route("/v1/tasks/:storyId").post(checkAuth, taskController.create);

  // UserStory Routes for deleting a user story
  //   app
  //     .route("/v1/user-stories/:storyId")
  //     .delete(checkAuth, userStoryController.delete);
};
