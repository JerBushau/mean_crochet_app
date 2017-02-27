'use strict'

const express = require('express');
const app = express();
const router = require('./router');

const parser = require('body-parser').json;
const logger = require('morgan');

require('./database');
require('./seed');

// host static stuff from /public folder
app.use('/', express.static('./public'));

// pretty console logger
app.use(logger('dev'));

// parse json
app.use(parser());

app.use('/projects', router);

// catch 404 
app.use((req, res, next) => {
  let err = new Error('not found');

  err.status = 404;
  next(err);
});

// Error handler 
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on', port)
});
