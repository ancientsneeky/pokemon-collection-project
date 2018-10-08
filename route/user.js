'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('../model/userModel');
const {deleteUserData, createNewUserData, getUserData, updateUserData} = require('../controller/user')

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new user
router.post('/', jsonParser, createNewUserData);

router.get('/:id', getUserData);

router.get('/', getUserData);

router.delete('/:id', deleteUserData);

router.patch('/:id', updateUserData);

module.exports = {router};
