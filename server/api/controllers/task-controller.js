"use strict";
//import task service.
const taskService = require("../services/task-service"),
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
 * Creates a new task with the request JSON and
 * returns success response.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.create = function (request, response) {
  try {
    const newTask = Object.assign({}, request.body);
    const resolve = (task) => {
      // add the created task id to userStory tasks array
      taskService
        .updateUserStory(task._id, request.params.storyId)
        .then((userStory) => {
          if (userStory) {
            response.status(201).json();
          } else {
            response.status(400).json({
              message: utilConstants.CLIENT_ERR,
            });
          }
        });
    };
    // check if project exists
    taskService
      .isUserStoryValid(request.params.storyId)
      .then((userStory) => {
        if (userStory.length > 0) {
          newTask.storyId = request.params.storyId;
          taskService
            .save(newTask)
            .then(resolve)
            .catch(renderErrorResponse(response));
        } else {
          response.status(404).json({
            message: "User Story not found",
          });
        }
      })
      .catch((err) => {
        logger.warn(err.message);
        response.status(404).json({
          message: "User Story not found",
        });
      });
  } catch (err) {
    renderErrorResponse(err);
  }
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
