const mongoose = require('mongoose');
const {MLAB_URL} = require('../config');
//https://mlab.com/login/
// use mlab instead of mongodb locally



(async () => {
  try{
    //mongoose connects
    await mongoose.connect(MLAB_URL, {useNewUrlParser: true});
    console.log('Mongoose Connected');
  }
  catch(err){
    //if mongoose fails
    console.log("Mongoose Failed to Connect");
    console.log(err);
  }
})()

require('../model/crud');
