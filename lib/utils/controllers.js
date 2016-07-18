'use strict';
// Variables and dependencies
var fs = require('fs');
var path = require('path');
var registeredControllerList = [];
// Create the bootstrap class
class ControllerFunctions {
  registerDir (controllersDir) {
    var success = 0;
    fs.readdirSync(controllersDir).forEach((controllerFile) => {
      var filename;
      if (path.extname(controllerFile) === '.js') {
        success = 1;
        filename = controllerFile.slice(0, -3);
        registeredControllerList.push(path.join(controllersDir, filename));
      }
    });
    return success;
  }
  getControllers () {
    var controllers = [];
    // Load controllers and related models
    registeredControllerList.forEach((controllerPath) => {
      var controller = require(controllerPath);
      var controllerName = path.basename(controllerPath);
      var method;
      var prefix;
      var key;
      // Assign methods in a controller to a URI
      for (key in controller) {
        switch (key) {
          case 'index':
            prefix = '';
            method = 'get';
            break;
          case 'get':
            prefix = `${controllerName}`;
            method = 'get';
            break;
          case 'post':
            prefix = `${controllerName}`;
            method = 'post';
            break;
          case 'put':
            prefix = `${controllerName}`;
            method = 'put';
            break;
          case 'show':
            prefix = `${controllerName}/:id`;
            method = 'get';
            break;
          case 'edit':
            prefix = `${controllerName}/:id`;
            method = 'post';
            break;
          case 'delete':
            prefix = `${controllerName}/:id`;
            method = 'delete';
            break;
          default:
            throw new Error(`Unrecognized route: ${controllerName}.${key}`);
        }
        controllers.push({
          method: method,
          prefix: `/${prefix}`,
          handler: controller[key]
        });
      }
    });
    return controllers;
  }
}
// Export the previously created class
module.exports = () => {
  return new ControllerFunctions();
};
