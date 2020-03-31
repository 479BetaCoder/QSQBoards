/**
 * Service for project operations.
 */

'use strict';
const mongoose = require('mongoose'),
    Project = mongoose.model('project');

/**
 * Returns an array of project object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = function (params) {
    const promise = Project.find(params).exec();
    return promise;
};

/**
 * Saves and returns the new project object.
 *
 * @param {Object} project {project object}
 */
exports.save = function (project) {
    const newProject = new Project(project);
    const promise = newProject.save();
    return promise;
};

/**
 * Returns the project object matching the id.
 *
 * @param {string} projectId {Id of the project object}
 */
exports.get = function (projectId) {
    const promise = Project.findById(projectId).exec();
    return promise
};

/**
 * Updates and returns the project object.
 *
 * @param {Object} project {project object}
 */
exports.update = function (project) {
    project.modifiedDate = new Date();
    const promise = Project.findOneAndUpdate({_id: project._id}, project).exec();
    return promise;
};

/**
 * Deletes the project object matching the id.
 *
 * @param {string} projectId {Id of the project object}
 */
exports.delete = function (projectId) {
    const promise = Project.find({_id: projectId}).remove({_id: projectId}).exec();
    return promise;
};