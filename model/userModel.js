'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {Card, PokeSet, setSchema, cardSchema} = require('./cardModel')

mongoose.Promise = global.Promise;


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
  email: {type: String, required: true, unique: true},
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

// pre hook card access for serialize
UserSchema.pre('find', function(next) {
  this.populate('cardCollection.collected.card');
  next();
});

// pre hook card access for serialize
UserSchema.pre('findOne', function(next) {
  this.populate('cardCollection.collected.card');
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
