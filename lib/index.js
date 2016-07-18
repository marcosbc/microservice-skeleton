'use strict';
// Dependencies
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var utils = require('./utils');
// Function for configuring Express instance
function initService(app) {
  // Initially the app is not ready (to be changed by the microservice)
  app.set('ready', false);
  app.set('utils', utils);
  // Configure output format for the express instance
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(morgan('combined'));
  utils.hooks.call('express', app);
  // Populate controllers into the Express instance
  utils.controllers.registerDir(path.join(__dirname, 'controllers'));
  utils.hooks.call('controllers', utils.controllers.registerDir);
  utils.controllers.getControllers().forEach((controller) => {
    app[controller.method](controller.prefix, controller.handler);
  });
  // Error handling
  app.use((error, req, res, next) => {
    var statusCode;
    var statusMessage;
    switch (error.statusCode) {
      case 400:
        statusCode = error.statusCode;
        statusMessage = 'Bad request';
        break;
      default:
        statusCode = 500;
        statusMessage = 'Internal server error';
        console.error(error.stack);
    }
    res.status(statusCode).json({
      error: true,
      message: statusMessage
    });
  });
  app.use((req, res, next) => {
    res.status(404).json({
      error: true,
      message: 'Not found'
    });
  });
}
module.exports = {
  registerHook: utils.hooks.register,
  listen: (port) => {
    // Initialize the Express instance
    var app = express();
    initService(app);
    // Start the server
    app.listen(port);
  }
};
