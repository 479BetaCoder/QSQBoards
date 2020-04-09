/**
 * Service for userStory operations.
 */

"use strict";
const mongoose = require("mongoose"),
  UserStory = mongoose.model("UserStories"),
  Project = mongoose.model("Projects"),
  Task = mongoose.model("Tasks"),
  utilConstants = require("../utils/Constants");

/**
 * Saves and returns the new userStory object.
 *
 * @param {Object} userStory {userStory object}
 */
exports.save = function (userStory) {
  const newUserStory = new UserStory(userStory);
  const promise = newUserStory.save();
  return promise;
};

/**
 * Checks for project Validity
 */
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
 * Returns the list of userStories for the projectId.
 *
 * @param {string} projectId {Id of the project object}
 */
exports.getStories = function (projectId) {
  const promise = UserStory.find(
    { projectId: projectId },
    { createdAt: 0, updatedAt: 0, projectId: 0 }
  )
    .populate("tasks", { updatedAt: 0, createdAt: 0 }, [], {})
    .exec();
  // return promise;
  // Load parent without children references (children is array of ObjectId)
  // const promise = UserStory.find(
  //   { projectId: projectId }).populate("tasks", [], {}).exec(
  //     function (err, children) {
  //       if (err) return Promise.reject(new Error(utilConstants.NOT_FOUND));
  //       let result = parent.toObject();
  //       result.children = children;
  //       return Promise.resolve(result);
  //     });
  //   )
  //   function (err, parent) {
  //     if (err || !parent)
  //       return Promise.reject(new Error(utilConstants.NOT_FOUND));

  //     // Load children for this parent, populating grandchildren (no need to load parent reference)
  //     return Task.find({ storyId: parent._id }, { parent: 0 })
  //       .populate("assignee", [], {})
  //       .exec(function (err, children) {
  //         if (err) return Promise.reject(new Error(utilConstants.NOT_FOUND));
  //         let result = parent.toObject();
  //         result.children = children;
  //         return Promise.resolve(result);
  //       });
  //   }
  // ).exec();

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
 * Deletes the userStory object matching the id.
 *
 * @param {string} projectId {Id of the project object}
 */
exports.delete = async function (storyId) {
  try {
    const validUserStory = await UserStory.findOne({ _id: storyId });
    if (validUserStory) {
      return validUserStory.remove();
    } else {
      return Promise.reject(new Error(utilConstants.FORBIDDEN_ERR));
    }
  } catch (err) {
    return Promise.reject(new Error(utilConstants.FORBIDDEN_ERR));
  }
};
