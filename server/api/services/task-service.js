/**
 * Service for Task operations.
 */

"use strict";
const mongoose = require("mongoose"),
  UserStory = mongoose.model("UserStories"),
  Task = mongoose.model("Tasks"),
  utilConstants = require("../utils/Constants");

/**
 * Checks for user Story Validity
 */
exports.isUserStoryValid = function (storyId) {
  try {
    const promise = UserStory.find({
      _id: storyId,
    }).exec();
    return promise;
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};

/**
 * Saves and returns the new task object.
 *
 * @param {Object} taskObj {task object}
 */
exports.save = function (taskObj) {
  const newTask = new Task(taskObj);
  const promise = newTask.save();
  return promise;
};

/**
 * Updates the user story tasks array with the added task
 *  @param {Object} taskId {task Id}
 * @param {Object} storyId {userStory Id}
 */
exports.updateUserStory = async function (taskId, storyId) {
  try {
    const userStory = await UserStory.findOne({ _id: storyId });
    if (userStory) {
      let currentTasks = userStory.tasks;
      let updatedTasks = currentTasks.push(taskId);
      userStory.tasks = updatedTasks;
      return userStory.update(userStory);
    } else {
      return Promise.reject(new Error(utilConstants.NOT_FOUND));
    }
  } catch (err) {
    return Promise.reject(new Error(utilConstants.NOT_FOUND));
  }
  //UserStory.findOneAndUpdate({_id: storyId},)
};
