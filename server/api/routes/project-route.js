/**
 * Project endpoint route definitions.
 */

'use strict';
module.exports = function (app) {
    const projectController = require('../controllers/project-controller');
    // Project Routes for search and create.
    app.route('/project')
        .get(projectController.list)
        .post(projectController.post);

    // Project Routes for get, update and delete.
    app.route('/project/:projectId')
        .get(projectController.get)
        .put(projectController.put)
        .delete(projectController.delete);
};