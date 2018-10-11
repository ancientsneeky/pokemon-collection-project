'use strict';
const express = require('express');
const bodyParser = require('body-parser');

// const {PokeSet} = require('../model/setModel');
const {deletePokeSetData, createNewPokeSetData, getPokeSetData, updatePokeSetData} = require('../controller/pokeSet')

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new set
router.post('/', jsonParser, createNewPokeSetData);

router.get('/:id', getPokeSetData);

router.get('/', getPokeSetData);

router.delete('/:id', deletePokeSetData);

// router.patch('sets/:id', updatePokeSetData);

module.exports = {router};
