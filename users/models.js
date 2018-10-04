'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;


const cardSchema = mongoose.Schema({
  name: {type: String, required: true},
  setID: {type: String},
  condidtion: {type: String},
  image: {type: String},
  nationalPokeNum: {type: Number},
  rarity: {type: String},
  tradeable: {type: Boolean, default: false}
});

const setSchema = mongoose.Schema({
  name: {type: String, required: true},
  collected: [cardSchema]
});


const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  dateJoined: {type: Date, default: Date.now()},
  avatar: {type: String, default: ''},
  bio: {type: String, default: ''},
  settings: {displayPerpage: {type: Number, default: 9}},
  cardCollection: [setSchema]
});


UserSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    cardCollection: this.cardCollection || '',
    settings: this.settings,
    bio: this.bio
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);
const Card = mongoose.model("Card", cardSchema);
const PokeSet = mongoose.model("pokeSet", setSchema)

module.exports = {User, Card, PokeSet};
