'use strict';
var hooks = {};
class HookFunctions {
  call (id, params) {
    if (typeof hooks[id] !== 'undefined') {
      hooks[id].forEach((handler) => {
        handler(params);
      });
    }
  }
  register (id, handler) {
    if (typeof hooks[id] === 'undefined') {
      hooks[id] = [];
    }
    hooks[id].push(handler);
  }
}
module.exports = () => {
  return new HookFunctions();
};
