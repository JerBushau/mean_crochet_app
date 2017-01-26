'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crochet-app', function(err) {
  if (err) {
    console.log('Failed connecting to MongoDB!');
  } else {
    console.log('Successfully connected to MongoDB!');
  }
});
