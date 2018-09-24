"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//https://mongoosejs.com/docs/guide.html for the future reference

//set mongoose promise
mongoose.Promise = global.Promise;
//example schema for testing
const crudSchema = new Schema({
  text:{
    type:String
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})


const crud = mongoose.model("Crud", crudSchema);
module.exports = crud
