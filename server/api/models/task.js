"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Mongoose schema for userStory object.
 */
let taskSchema = new Schema(
  {
    /**
     * Title of the tasks.
     */
    title: {
      type: String,
      required: "title is required",
    },
    /**
     * Task description.
     */
    description: {
      type: String,
    },
    /**
     * Task comments.
     */
    comments: [
      {
        text: String,
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    /**
     * Task status.
     */
    status: {
      type: String,
      default: "New",
    },
    /**
     * Priority for the tasks
     */
    priority: {
      type: Number,
      default: 0,
    },
    /**
     * Assignee for the tasks
     */
    assignee: {
      userName: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Tasks", taskSchema);
