const mongoose = require('mongoose');
const {MLAB_URL} = require('../config');
//https://mlab.com/login/
// use mlab instead of mongodb locally



(async () => {
  try{
    //mongoose connects
    await mongoose.connect(MLAB_URL, {useNewUrlParser: true});
    console.log('mongoose connected');
  }
  catch(err){
    //if mongoose fails
    console.log("mongoose failed to connect");
    console.log(err);
  }
})()

require('../model/crud');
