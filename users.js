

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},

});

users.pre('save', async function() {

  this.password = await bcrypt.hash(this.password, 5);

});



users.statics.authenticateBasic = function(user, pass) {
  let query = {username:user};
  return this.findOne(query)
    .then( user => user && user.comparePassword(pass) )
    .catch(error => {throw error;});
};

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

users.methods.generateToken = function(user) {


  let token = jwt.sign({ username: user.username}, process.env.SECRET);
  console.log('token : ', token);

  return token;
};

module.exports = mongoose.model('users', users);