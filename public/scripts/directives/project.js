angular.module("crochetApp")
.directive('projects', function() {
    return {
        templateUrl: 'templates/projects.html',
        controller: 'widgetCtrl'
    }
})
