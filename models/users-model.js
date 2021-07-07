'use strict';

const users = require('../models/users-model.js');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let SECRET = 'coolsecret';

// let db = {};
let users = {};



module.exports = users;



const schema = require('./users-schema.js');
const dataModel = require('./model.js');

class Users extends dataModel {

    constructor(){
        super()
    }
    save = async function (record) {

        if(!this.find({username:record.username})){
            record.password = await bcrypt.hash(record.password, 5);
      
          db[record.username] = record;
          return record;
        }
      
        return Promise.reject();
      }
      
      authenticateBasic = async function(user,pass) {
        let valid = await bcrypt.compare(pass, db[user].password);
        return valid ? db[user] : Promise.reject();
      }
      
      generateToken = function(user) {
        let token = jwt.sign({ username: user.username}, SECRET);
        return token;
      }
      
      list = () => this.get();
}

module.exports = new Users(schema);