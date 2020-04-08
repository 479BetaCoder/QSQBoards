/**
 * UserStory endpoint route definitions.
 */

"use strict";
module.exports = function (app) {
  const userStoryController = require("../controllers/userStory-controller"),
    checkAuth = require("../services/auth-service");
  // UserStory Routes for create.
  app
    .route("/userStories/:projectId")
    .post(checkAuth, userStoryController.create);

  //.get(checkAuth, userStoryController.list);
};
