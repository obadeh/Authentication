'use strict';

const express = require('express');
const router = express.Router();

const users = require('../models/users-model.js');

app.post('/signup', (req, res) => {
    users.save(req.body)
      .then(user => {
        let token = users.generateToken(user);
        res.status(200).send(token);
      })
  });
  
  app.post('/signin', basicAuth, (req, res) => {
    res.status(200).send(req.token);
  });
  
  app.get('/users', basicAuth, (req, res) => {
    res.status(200).json(users.list());
  });
  


module.exports = router;