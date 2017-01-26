'use strict'

const express = require('express');
const router = express.Router();
const Project = require('./models/project');

// GET/read all projects
router.get('/', (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({projects: projects});
  });
});

// GET/read specific project
router.get('/:pID', (req, res) => {
  Project.findById(req.params.pID, (err, project) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({project: project})
  });
});

// PUT/update project 
router.put('/:pID', (req, res) => {
  const id = req.params.pID;
  const project = req.body;
  if (project && project._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Project.findByIdAndUpdate(id, project, {new: true}, function(err, project) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({project: project, message: 'Project updated!'})
  });
});

// POST/create new project
router.post('/', (req, res) => {
  const project = req.body;
  Project.create(project, function(err, project) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ project: project, message: 'Project Created' });
  });
});

// DELETE/delete project
router.delete('/:pID', (req, res) => {
  const id = req.params.pID;
  Project.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'project Deleted' });
  });
});

module.exports = router;
