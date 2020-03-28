'use strict';
module.exports = function (app) {
    //Initialize models
    let userModel = require('./models/user');
    let taskModel = require('./models/task');
    let projectModel = require('./models/project');

    //Initialize routes
    let userRoutes = require('./routes/user-route');
    let taskRoutes = require('./routes/task-route');
    let projectRoutes = require('./routes/project-route');
    //userRoutes(app);
    projectRoutes(app);
};