
const mongoose = require('mongoose');
const products = mongoose.Schema({

  username: { type: String, required: true },

});


module.exports = mongoose.model('username', username);