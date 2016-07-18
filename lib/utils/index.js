'use strict';
// Export library of functions
module.exports = {
  hooks: require('./hooks')(),
  http: require('./http')(),
  controllers: require('./controllers')()
};
