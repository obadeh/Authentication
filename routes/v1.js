const express = require('express');

const basicAuth = require('../middleware/basic-auth.js');
const User = require('../users.js');


const router = express.Router();


router.post('/signup', (req, res) => {
  // hash the pass from req body then save
// create new user and save it in databsase 
    new User(req.body).save()
      .then(userIn => {
        let token = userIn.generateToken(userIn);
        res.status(200).send(token);
      })
  });
  
  router.post('/signin', basicAuth, (req, res) => {
   
    // creat token and append to req by basicAuth middleware
  
    res.status(200).json(req.token)
  });
  
  router.get('/users', basicAuth, (req, res) => {
    
    // show all users from database
    User.find().then(data=>{
      res.status(200).json(data);
    })
   
  });

  module.exports = router;
