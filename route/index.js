express = require('express');
//every routes starts with /api
module.exports = app => {
  app.use('/api', require('./crud'));
  app.use(express.static('./public'));
}
