'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
 
});

users.pre('save', async function() {
 
    this.password = await bcrypt.hash(this.password, 5);
  
});

// users.statics.createFromOauth = function(email) {

//   if(! email) { return Promise.reject('Validation Error'); }

//   return this.findOne( {email} )
//     .then(user => {
//       if( !user ) { throw new Error('User Not Found'); }
//       console.log('Welcome Back', user.username);
//       return user;
//     })
//     .catch( error => {
//       console.log('Creating new user');
//       let username = email;
//       let password = 'none';
//       return this.create({username, password, email});
//     });

// };

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

users.methods.generateToken = function(user) {

 

  let token = jwt.sign({ username: user.username}, process.env.SECRET);


  return token;
};

module.exports = mongoose.model('users', users);