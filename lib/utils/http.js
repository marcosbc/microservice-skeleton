'use strict';
var defaults = require('lodash.defaults');
// Object of common-usage functions
class HttpFunctions {
  constructUrl (protocol, host, port, path) {
    var url = `${protocol}://${host}`;
    if ((protocol === 'http' && port !== 80) ||
        (protocol === 'https' && port !== 443)) {
      url += ':' + port;
    }
    url += path;
    return url;
  }
  getFrontEndUrl (frontend) {
    frontend = defaults(frontend, {
      protocol: 'http',
      host: '127.0.0.1',
      port: 80,
      base: '/'
    });
    return this.constructUrl(frontend.protocol, frontend.host, frontend.port, frontend.base);
  }
  getHttpError (errorCode, msg) {
    return {
      error: true,
      code: errorCode,
      message: msg
    };
  }
}
// Export the previously created class
module.exports = () => {
  return new HttpFunctions();
};
