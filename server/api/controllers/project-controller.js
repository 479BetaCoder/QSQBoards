"use strict";
//import task service.
const projectService = require("../services/project-service"),
  utilConstants = require("../utils/Constants"),
  log4js = require("log4js");
log4js.configure({
  appenders: {
    everything: { type: "file", filename: "logs/qsqBoard.log" }
  },
  categories: {
    default: { appenders: ["everything"], level: "debug" }
  }
});
const logger = log4js.getLogger("qsqBoard");

/**
 * Returns a list of projects in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function(request, response) {
  const resolve = projects => {
    response.status(200);
    response.json(projects);
  };
  const loggedInUser = request.userData.userName;
  projectService
    .search(loggedInUser)
    .then(resolve)
    .catch(renderErrorResponse(response));
};

/**
 * Creates a new project with the request JSON and
 * returns project JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function(request, response) {
  try {
    const newProject = Object.assign({}, request.body);
    newProject.owner = request.userData.userName;
    const resolve = () => {
      response.status(201).json();
    };
    projectService
      .save(newProject)
      .then(resolve)
      .catch(renderErrorResponse(response));
  } catch (err) {
    renderErrorResponse(err);
  }
};

/**
 * Returns a project object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function(request, response) {
  const resolve = project => {
    response.status(200);
    response.json(project);
  };
  projectService
    .get(request.params.projectId)
    .then(resolve)
    .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a project object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function(request, response) {
  const project = Object.assign({}, request.body);
  const resolve = () => {
    response.status(200).json();
  };
  project._id = request.params.projectId;
  projectService
    .update(project, request.userData.userName)
    .then(resolve)
    .catch(renderErrorResponse(response));
};

/**
 * Deletes a project object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function(request, response) {
  const resolve = () => {
    response.status(200).json();
  };
  projectService
    .delete(request.params.projectId, request.userData.userName)
    .then(resolve)
    .catch(renderErrorResponse(response));
};
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = response => {
  const errorCallback = error => {
    if (error && error.message === utilConstants.FORBIDDEN_ERR) {
      response.status(403).json({
        message: utilConstants.FORBIDDEN_ERR
      });
    } else if (error && error.name === utilConstants.VALIDATION_ERR) {
      response.status(400);
      logger.warn(`Client error: ${error.message}`);
      response.json({
        message: utilConstants.CLIENT_ERR
      });
    } else {
      response.status(500);
      logger.fatal(`Server error: ${error.message}`);
      response.json({
        message: utilConstants.SERVER_ERR
      });
    }
  };
  return errorCallback;
};
