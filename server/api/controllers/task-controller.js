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
    const resolve = () => {
      response.status(201).json();
    };
    // check if project exists
    taskService
      .isUserStoryValid(request.params.storyId)
      .then((userStory) => {
        if (userStory.length > 0) {
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
