'use strict';

const express = require('express');
const basicAuth = require('./basic-auth.js');
const User = require('./users.js');

const app = express();

app.use(express.json());

require('dotenv').config();

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGODB_URI, options);

app.post('/signup', (req, res) => {

  
  new User(req.body).save()
    .then(userIn => {
      let token = userIn.generateToken(userIn);
      res.status(200).send(token);
    })
});

app.post('/signin', basicAuth, (req, res) => {
 
  // creat token and append to req by basicAuth middleware

  res.status(200).json(req.token)
});

app.get('/users', basicAuth, (req, res) => {
  
  let users=User.find()
  console.log('users : ', users);
  res.status(200).json(users);
});

app.listen(3000, () => console.log('server up'));
