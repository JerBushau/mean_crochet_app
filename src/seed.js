'use strict';

const Project = require('./models/project');

const projects = [
  {
    title: 'hat',
    currentRow: 0,
    currentStitch: 0
  },
  {
    title: 'blanket',
    currentRow: 0,
    currentStitch: 0
  },
  {
    title: 'scarf',
    currentRow: 0,
    currentStitch: 0
  }
];

projects.forEach(function (project, index) {
  Project.find({}, function(err, projects) {
    if (!err && !projects.length) {
      Project.create({
        title: project.title, 
        currentStitch: project.currentStitch,
        currentRow: project.currentRow
      });
    }
  });
});
