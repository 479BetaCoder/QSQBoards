/**
 * UserStory endpoint route definitions.
 */

"use strict";
module.exports = function (app) {
  const userStoryController = require("../controllers/userStory-controller"),
    checkAuth = require("../services/auth-service");
  // UserStory Routes for create and get
  app
    .route("/v1/user-stories/:projectId")
    .post(checkAuth, userStoryController.create)
    .get(checkAuth, userStoryController.list);

  // UserStory Routes for deleting and updating a user story
  app
    .route("/v1/user-stories/:storyId")
    .delete(checkAuth, userStoryController.delete)
    .put(checkAuth, userStoryController.updateUserStory);
};
