


// 3rd party dependencies

const express = require('express');
const morgan = require('morgan');

// custom middleware
const notFound = require('../middleware/notfound');
const errorHandler = require('../middleware/error');

// epress app
const app = express();
app.use(express.json());

// custom routes
const apiRouter = require('../routes/v1.js');

// app uses
app.use(morgan('dev'));
app.use(apiRouter);
app.use(errorHandler);
app.use('*', notFound);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3333;
    app.listen(PORT, () => console.log('server up:', PORT));
  },
};