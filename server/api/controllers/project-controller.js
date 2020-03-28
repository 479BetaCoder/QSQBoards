'use strict';
//import task service.
const projectService = require('../services/project-service');

/**
 * Returns a list of projects in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    const resolve = (projects) => {
        response.status(200);
        response.json(projects);
    };
    projectService.search({})
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
exports.post = function (request, response) {
    const newProject = Object.assign({}, request.body);
    const resolve = (project) => {
        response.status(200);
        response.json(project);
    };
    projectService.save(newProject)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Returns a project object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
    const resolve = (project) => {
        response.status(200);
        response.json(project);
    };
    projectService.get(request.params.projectId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a project object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const project = Object.assign({}, request.body);
    const resolve = (project) => {
        response.status(200);
        response.json(project);
    };
    project._id = request.params.projectId;
    projectService.update(project)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a project object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    const resolve = (project) => {
        response.status(200);
        response.json({
            message: 'Project Successfully deleted'
        });
    };
    projectService.delete(request.params.projectId)
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
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};