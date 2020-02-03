'use strict';

const express = require('express');
const basicAuth = require('./basic-auth.js');
const User = require('./users-schema.js');

const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {

  new User.save(req.body)
    .then(user => {
      let token = users.generateToken(user);
      res.status(200).send(token);
    })
});

app.post('/signin', basicAuth, (req, res) => {
 
});

app.get('/users', basicAuth, (req, res) => {
  res.status(200).json(users.list());
});

app.listen(3000, () => console.log('server up'));
