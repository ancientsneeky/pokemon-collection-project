'use strict';
const mongoose = require('mongoose');
const {User} = require('./userModel');

// mongoose.Promise = global.Promise;


const cardSchema = mongoose.Schema({
  name: {type: String, required: true},
  setID: {type: String, unique: true, required: true},
  image: {type: String},
  nationalPokeNum: {type: Number},
  rarity: {type: String},
});

const userDefined = mongoose.Schema({
  card: {type: mongoose.Schema.Types.ObjectId, ref: "Card"},
  // card: [cardSchema],
  condition: {type: String, default: "Near Mint"}, 
  tradeable: {type: Boolean, default: false}
});

const setSchema = mongoose.Schema({
  name: {type: String, required: true},
  collected: [userDefined]
});

// pre hook card access for serialize
userDefined.pre('find', function(next) {
  this.populate('card');
  next();
});

// pre hook card access for serialize
userDefined.pre('findOne', function(next) {
  this.populate('card');
  next();
});

cardSchema.methods.serialize = function() {
  return {
    id: this.id,
    name: this.name || '',
    setID: this.setID || '',
    image: this.image || '',
    nationalPokeNum: this.nationalPokeNum || '',
    rarity: this.rarity
  };
};

setSchema.methods.serialize = function() {
  return {
    id: this.id,
    name: this.name || '',
    collected: this.collected || ''
  };
};


const Card = mongoose.model("Card", cardSchema);
const PokeSet = mongoose.model("pokeSet", setSchema)

module.exports = {Card, 
  PokeSet, 
  setSchema, 
  cardSchema};
