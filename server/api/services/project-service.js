/**
 * Service for project operations.
 */

"use strict";
const mongoose = require("mongoose"),
  Project = mongoose.model("Projects"),
  UserStory = mongoose.model("UserStories"),
  utilConstants = require("../utils/Constants");
/**
 * Returns an array of project object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = function (userName) {
  const promise = Project.find({
    $or: [{ owner: userName }, { members: userName }],
  }).exec();
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
  return promise;
};

/**
 * Updates and returns the project object.
 *
 * @param {Object} project {project object}
 */
exports.update = async function (project, userName) {
  try {
    const validProject = await Project.findOne({ _id: project._id });

    if (validProject && validProject.owner === userName) {
      project.modifiedDate = new Date();
      return validProject.update(project);
    } else {
      return Promise.reject(new Error(utilConstants.FORBIDDEN_ERR));
    }
  } catch (err) {
    return Promise.reject(new Error(utilConstants.FORBIDDEN_ERR));
  }
};

/**
 * Deletes the project object matching the id.
 *
 * @param {string} projectId {Id of the project object}
 */
exports.delete = async function (projectId, userName) {
  try {
    const validProject = await Project.findOne({ _id: projectId });
    if (validProject && validProject.owner === userName) {
      // Remove the associated userStories
      UserStory.deleteMany({ projectId: projectId }).exec();
      return validProject.remove();
    } else {
      return Promise.reject(new Error(utilConstants.FORBIDDEN_ERR));
    }
  } catch (err) {
    return Promise.reject(new Error(utilConstants.FORBIDDEN_ERR));
  }
};
