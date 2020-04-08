/**
 * UserStory endpoint route definitions.
 */

"use strict";
module.exports = function (app) {
  const userStoryController = require("../controllers/userStory-controller"),
    checkAuth = require("../services/auth-service");
  // UserStory Routes for create and get
  app
    .route("/userStories/:projectId")
    .post(checkAuth, userStoryController.create)
    .get(checkAuth, userStoryController.list);

  // UserStory Routes for deleting a user story
  app
    .route("/userStories/:storyId")
    .delete(checkAuth, userStoryController.delete);
};
