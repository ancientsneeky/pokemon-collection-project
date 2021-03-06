const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');

//get all our middleware loaded
module.exports = app => {
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});
}
