const router = require('express').Router();
const passport = require('passport');
// const express = require('express');
// const app = express();
//load controller functions for HTTP Methods
const {saveData,getData,deleteData,updateData} = require('../controller/crud');

const { router: usersRouter } = require('../users');
const { router: authRouter, localStrategy, jwtStrategy } = require('../auth');

passport.use(localStrategy);
passport.use(jwtStrategy);

router.use('/users', usersRouter);
router.use('/auth', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });
router.get('/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

// router.get('/users', (req, res) => {
// 	res.status(200).send({message: "GET USERS"})
// })

// router.get('/auth', (req, res) => {
// 	res.status(200).send({message: "GET AUTH"})
// })

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
