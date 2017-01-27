'use strict'

function MainCtrl($scope, dataService) {



  $scope.getProjects = function() {
    dataService.getProjects(function(response) {
        $scope.projects = response.data.projects
    });
  }

  $scope.getProjects();

  $scope.addProject = function() {
    $scope.projects.push({
      title: $scope.project.title,
      currentRow: 0,
      currentStitch: 0
    });

    dataService.saveProjects($scope.projects);
    $scope.project.title = '';
    $scope.getProjects();
  }
}

module.exports = MainCtrl;
