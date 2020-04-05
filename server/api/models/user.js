"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Mongoose schema for user.
 */
const userSchema = new Schema(
  {
    /**
     * emailId of the user.
     */
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: "Email is required"
    },

    /**
     * username of the user.
     */
    userName: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: "Username is required"
    },

    /**
     * password of the user.
     */
    password: {
      type: String,
      required: "Password is required"
    },
    /**
     * image of the user.
     */
    image: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Users", userSchema);
