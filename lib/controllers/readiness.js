'use strict';
module.exports = {
  get: (req, res, next) => {
    res.json({
      ready: req.app.get('ready')
    });
  }
};
