const router = require('express').Router();
const passport = require('passport');
// const express = require('express');
// const app = express();
//load controller functions for HTTP Methods
const {saveData,getData,deleteData,updateData} = require('../controller/crud');

const { router: usersRouter } = require('./user');
const { router: authRouter, localStrategy, jwtStrategy } = require('../auth');
const { router: cardRouter} = require('./card');
const { router: pokeSetRouter} = require('./pokeSet');

passport.use(localStrategy);
passport.use(jwtStrategy);

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/cards', cardRouter);
router.use('/sets', pokeSetRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });
router.get('/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

router.get('/', (req,res) => {
  res.status(200).send({message:"hello world"})
})

//post data requires {text:"string"} atm
router.post('/crud', saveData)
//get all data
router.get('/crud', getData)
//get data by id
router.get('/crud/:id', getData)
//delete data by id
router.delete('/crud/:id', deleteData)
//delete all data
router.delete('/crud', deleteData)

//update data by id
router.patch('/crud/:id', updateData)



module.exports = router
