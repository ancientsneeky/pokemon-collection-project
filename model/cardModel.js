'use strict';
const mongoose = require('mongoose');
const {User} = require('./userModel');

// mongoose.Promise = global.Promise;


const cardSchema = mongoose.Schema({
  name: {type: String, required: true},
  setID: {type: String},
  image: {type: String},
  nationalPokeNum: {type: Number},
  rarity: {type: String},
});

const userDefined = mongoose.Schema({
  card: {type: mongoose.Schema.Types.ObjectId, ref: "Card"},
  condition: {type: String, default: "Near Mint"}, 
  tradeable: {type: Boolean, default: false}
});

const setSchema = mongoose.Schema({
  name: {type: String, required: true},
  collected: [userDefined]
});

// pre hook author access for serialize
userDefined.pre('find', function(next) {
  this.populate('card');
  next();
});

// pre hook author access for serialize
userDefined.pre('findOne', function(next) {
  this.populate('card');
  next();
});


const Card = mongoose.model("Card", cardSchema);
const PokeSet = mongoose.model("pokeSet", setSchema)

module.exports = {Card, 
  PokeSet, 
  setSchema, 
  cardSchema};
