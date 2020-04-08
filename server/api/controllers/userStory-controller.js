"use strict";
//import task service.
const userStoryService = require("../services/userStory-service"),
  utilConstants = require("../utils/Constants"),
  log4js = require("log4js");
log4js.configure({
  appenders: {
    everything: { type: "file", filename: "logs/qsqBoard.log" },
  },
  categories: {
    default: { appenders: ["everything"], level: "debug" },
  },
});
const logger = log4js.getLogger("qsqBoard");

/**
 * Creates a new UserStory with the request JSON and
 * returns success response.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.create = function (request, response) {
  try {
    const newUserStory = Object.assign({}, request.body);
    const resolve = () => {
      response.status(201).json();
    };
    // check if project exists
    userStoryService
      .isProjectValid(request.params.projectId)
      .then((project) => {
        if (project.length) {
          newUserStory.projectId = request.params.projectId;
          userStoryService
            .save(newUserStory)
            .then(resolve)
            .catch(renderErrorResponse(response));
        } else {
          response.status(404).json({
            message: "Project not found",
          });
        }
      })
      .catch((err) => {
        logger.warn(err.message);
        response.status(404).json({
          message: "Project not found",
        });
      });
  } catch (err) {
    renderErrorResponse(err);
  }
};

/**
 * Returns a list of userStories in JSON based on the
 * projectId parameter
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
  const resolve = (userStories) => {
    if (userStories) {
      response.status(200);
      response.json(userStories);
    } else {
      response.status(404).json();
    }
  };
  const projectId = request.params.projectId;
  userStoryService
    .getStories(projectId)
    .then(resolve)
    .catch(renderErrorResponse(response));
};

/**
 * Deletes a user Story object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
  const resolve = () => {
    response.status(200).json();
  };
  userStoryService
    .delete(request.params.storyId)
    .then(resolve)
    .catch(renderErrorResponse(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
  const errorCallback = (error) => {
    if (error && error.message === utilConstants.FORBIDDEN_ERR) {
      response.status(403).json({
        message: utilConstants.FORBIDDEN_ERR,
      });
    } else if (error && error.name === utilConstants.VALIDATION_ERR) {
      response.status(400);
      logger.warn(`Client error: ${error.message}`);
      response.json({
        message: utilConstants.CLIENT_ERR,
      });
    } else {
      response.status(500);
      logger.fatal(`Server error: ${error.message}`);
      response.json({
        message: utilConstants.SERVER_ERR,
      });
    }
  };
  return errorCallback;
};
