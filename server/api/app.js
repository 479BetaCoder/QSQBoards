'use strict';
module.exports = function (app) {
    //Initialize models
    let userModel = require('./models/user');
    let taskModel = require('./models/task');

    //Initialize routes
    let userRoutes = require('./routes/user-route');
    let taskRoutes = require('./routes/task-route');
    userRoutes(app);
};