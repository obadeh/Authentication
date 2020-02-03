'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users=require('./user-schema')

let SECRET = 'coolsecret';



users.save = async function (record) {

  if (!this.find({username:record.username})) {
    record.password = await bcrypt.hash(record.password, 5);

    db[record.username] = record;
    return record; /// what if promis.resolve(record)??
  }

  return Promise.reject();
}

users.authenticateBasic = async function(user,pass) {
  let valid = await bcrypt.compare(pass, db[user].password);
  return valid ? db[user] : Promise.reject();
}

users.generateToken = function(user) {
  let token = jwt.sign({ username: user.username}, SECRET);
  return token;
}

users.list = () => db;

module.exports = users;