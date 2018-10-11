'use strict';
const express = require('express');
const bodyParser = require('body-parser');

// const {Card} = require('../model/cardModel');
const {deleteCardData, createNewCardData, getCardData, updateCardData} = require('../controller/card')

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new card
router.post('/', jsonParser, createNewCardData);

router.get('/:id', getCardData);

router.get('/', getCardData);

router.delete('/:id', deleteCardData);

// router.patch('cards/:id', updateCardData);

module.exports = {router};
