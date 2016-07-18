'use strict';
module.exports = {
  get: (req, res, next) => {
    res.json({
      hello: 'world'
    });
  }
};
