"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Mongoose schema for project object.
 */
let projectSchema = new Schema(
  {
    /**
     * Title of the Project  item.
     */
    title: {
      type: String,
      required: "title is required"
    },
    /**
     * Project item description.
     */
    description: {
      type: String
    },
    /**
     * Project item comments.
     */
    comments: {
      type: String
    },
    /**
     * Project item status.
     */
    status: {
      type: String,
      default: "New"
    },
    /**
     * Project owner
     */
    owner: {
      type: String,
      ref: "Users"
    },
    /**
     * Project Members
     */
    members: [{ type: String, ref: "Users" }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("project", projectSchema);
