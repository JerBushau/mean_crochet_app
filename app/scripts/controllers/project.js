'use strict'

function WidgetCtrl($scope, dataService) {
  $scope.up = function(project ,prop) {
    if(prop === 'row') {
        project.currentRow += 1; 
    } else if (prop === 'stitch') {
        project.currentStitch +=1;
    }
    dataService.updateProject(project);   
  }

  $scope.down = function(project, prop) {
    if (prop === 'row' && project.currentRow) {
        project.currentRow -= 1;
    } else if (prop === 'stitch' && project.currentStitch) {
        project.currentStitch -= 1;
    }
    dataService.updateProject(project);
  }

  $scope.clear = function(project, prop) {
    if (prop === 'row') {
        project.currentRow = 0;
    } else if (prop === 'stitch') {
        project.currentStitch = 0;
    }
    dataService.updateProject(project);
  }

  $scope.delete = function(project, index) {
    dataService.deleteProject(project).then(function() {
        $scope.projects.splice(index, 1);
    });
  }
};

module.exports = WidgetCtrl;
