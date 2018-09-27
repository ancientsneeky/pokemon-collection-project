'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models');
const {deleteUserData, createNewUserData} = require('../controller/user')

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new user
router.post('/', jsonParser, createNewUserData);

// Never expose all your users like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
router.get('/', (req, res) => {
  return User.find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', deleteUserData);

module.exports = {router};
