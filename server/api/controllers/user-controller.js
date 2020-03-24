"use strict";
//import user service.
const userService = require("../services/user-service");
const { check, validationResult } = require("express-validator"),
  utilConstants = require("../utils/Constants"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

exports.validateUser = () => {
  return [
    check("emailId", utilConstants.INVALID_EMAIL)
      .exists()
      .isEmail(),
    check("password", utilConstants.INVALID_PASSWORD)
      .exists()
      .isLength({ min: 8 })
  ];
};

/**
 * Registers a new user with the request JSON
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.createUser = (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({
        message: utilConstants.USER_REQ_ERR
      });
      return;
    }
    // after validating
    const newUser = Object.assign({}, request.body);
    const resolve = () => {
      response.status(201).json();
    };
    userService
      .createUser(newUser)
      .then(resolve)
      .catch(renderErrorResponse(response));
  } catch (err) {
    renderErrorResponse(err);
  }
};

/**
 * Logs in a registered User
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.loginUser = (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({
        message: utilConstants.USER_REQ_ERR
      });
      return;
    }
    // after validating
    const resolve = user => {
      if (!user) {
        return response.status(401).json({
          message: "Login Failed"
        });
      }
      bcrypt.compare(request.body.password, user.password, (err, result) => {
        if (err) {
          return response.status(401).json({
            message: "Login Failed"
          });
        }
        if (result) {
          const jwtToken = jwt.sign(
            {
              email: user.emailId,
              userId: user._id
            },
            utilConstants.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return response.status(200).json({
            message: "Login Successful",
            token: jwtToken
          });
        }

        return response.status(401).json({
          message: "Login Failed"
        });
      });
    };
    userService
      .loginUser(request.body)
      .then(resolve)
      .catch(renderErrorResponse(response));
  } catch (err) {
    renderErrorResponse(err);
  }
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object from service
 * @return {Function} The error handler function.
 */
let renderErrorResponse = response => {
  const errorCallback = error => {
    if (error && error.code === utilConstants.MONGO_CONFLICT_CODE) {
      response.status(422);
      response.json({
        message: utilConstants.UNIQUE_EMAIL_ERR
      });
    } else if (error && error.name !== utilConstants.VALIDATION_ERR) {
      response.status(500);
      response.json({
        message: error.message
      });
    } else if (error && error.name === utilConstants.VALIDATION_ERR) {
      response.status(400);
      response.json({
        message: error.message
      });
    }
  };
  return errorCallback;
};
