const express = require('express');

const basicAuth = require('../middleware/basic-auth.js');
const oauth = require('../middleware/oauth.js');
const User = require('../users.js');
let bearerAuth = require('../middleware/bearer-auth-middleware.js');
const ableTo = require('../middleware/capability.js');

// eslint-disable-next-line new-cap
const router = express.Router();



router.get('/public',(req,res)=>{
  res.status(200).send('okay');
});

router.get('/private',basicAuth,(req,res)=>{
  res.status(200).send('okay');
});

router.get('/readonly',ableTo('read'),(req,res)=>{
  res.status(200).send('okay');
});

router.get('/create',ableTo('create'),(req,res)=>{
  res.status(200).send('okay');
});

router.put('/update',ableTo('update'),(req,res)=>{
  res.status(200).send('okay');
});

router.patch('/delete',ableTo('delete'),(req,res)=>{
  res.status(200).send('okay');
});

router.get('/everything',ableTo('delete'),(req,res)=>{
  res.status(200).send('okay');
});



module.exports = router;
