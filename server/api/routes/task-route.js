/**
 * Tasks endpoint route definitions.
 */

"use strict";
module.exports = function (app) {
  const taskController = require("../controllers/task-controller"),
    checkAuth = require("../services/auth-service");
  // Task Routes for createing
  app.route("/v1/tasks/:storyId").post(checkAuth, taskController.create);

  // Task Routes for deleting a Task
  app.route("/v1/tasks/:taskId")
    .delete(checkAuth, taskController.delete)
    .put(checkAuth, taskController.updateTask);
};
