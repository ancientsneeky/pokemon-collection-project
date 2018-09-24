const bodyParser = require('body-parser');
const morgan = require('morgan');

//get all our middleware loaded
module.exports = app => {
  app.use(bodyParser.json())
  app.use(morgan('dev'))
}
