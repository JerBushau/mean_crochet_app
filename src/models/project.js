'use strict';

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  currentStitch: Number,
  currentRow: Number
});

const model = mongoose.model('Project', projectSchema);

module.exports = model;
