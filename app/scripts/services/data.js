'use strict'

function DataService($http, $q) {
    this.getProjects = function(cb) {
        $http.get('/projects')
        .then(cb);
    }

    this.deleteProject = function(project) {
        if (!project._id) {
            return $q.resolve();
        }
        return $http.delete('/projects/' + project._id)
        .then(function() {
            console.log("I deleted the " + project.title + " project!");
        });
    }

    this.updateProject = function(project) {
        if (!project._id) {
            return $q.resolve();
        }
        return $http.put('/projects/' + project._id, project)
    }

    this.saveProjects = function(projects) {
    var queue = [];
    projects.forEach(function(project) {
      var request;
      if(!project._id) {
        request = $http.post('/projects', project);
      } else {
        request = $http.put('/projects/' + project._id, project)
        .then(function(result) {
          project = result.data.project;
          return project;
        });
      }
      queue.push(request);
    });
    // $q is an angular service
    return $q.all(queue).then(function(results) {
      console.log("I saved " + projects.length + " project(s)!");
    });
  }; 
};

module.exports = DataService;
