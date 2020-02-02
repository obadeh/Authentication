'use strict';

// 3rd party dependencies

const express = require('express');
const basicAuth = require('./basic-auth-middleware.js');
const users = require('../models/users-model.js');


// custom middleware
// this is where your error handling middleware goes
const notFound = require('../middleware/notfound');
const errorHandler = require('../middleware/error');


// custom routes
const apiRouter = require('../routes/v1.js');



// application constants
const app = express();

app.use(express.json());
app.use(apiRouter);
app.use(notFound);
app.use(errorHandler);



module.exports = {
    server: app,
    start: port => {
      let PORT = port || process.env.PORT || 3333;
      app.listen(PORT, () => console.log('server up:', PORT));
    },
  };

////////////////////////////
