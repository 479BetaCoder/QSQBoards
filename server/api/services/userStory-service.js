/**
 * Service for userStory operations.
 */

"use strict";
const mongoose = require("mongoose"),
  UserStory = mongoose.model("UserStories"),
  Project = mongoose.model("Projects"),
  utilConstants = require("../utils/Constants");

/**
 * Saves and returns the new project object.
 *
 * @param {Object} project {project object}
 */
exports.save = function (userStory) {
  const newUserStory = new UserStory(userStory);
  const promise = newUserStory.save();
  return promise;
};

exports.isProjectValid = function (projectId) {
  try {
    const promise = Project.find({
      _id: projectId,
    }).exec();
    return promise;
  } catch (err) {
    return Promise.reject(new Error(err));
  }
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
      return validProject.remove();
    } else {
      return Promise.reject(new Error(utilConstants.FORBIDDEN_ERR));
    }
  } catch (err) {
    return Promise.reject(new Error(utilConstants.FORBIDDEN_ERR));
  }
};
