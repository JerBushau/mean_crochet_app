webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const angular = __webpack_require__(1);

	angular.module('crochetApp', []);

	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(7);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const angular = __webpack_require__(1);

	angular.module('crochetApp').service('dataService', __webpack_require__(4));


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const angular = __webpack_require__(1);

	angular.module('crochetApp').directive('projects', __webpack_require__(6));


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict'
	function ProjectDirective() {
	    return {
	        templateUrl: 'templates/projects.html',
	        controller: 'widgetCtrl'
	    }
	}

	module.exports = ProjectDirective;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const angular = __webpack_require__(1);

	angular.module('crochetApp').controller('mainCtrl', __webpack_require__(8));
	angular.module('crochetApp').controller('widgetCtrl', __webpack_require__(9));


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict'

	function MainCtrl($scope, dataService) {

	    $scope.getProjects = function() {
	        dataService.getProjects(function(response) {
	            $scope.projects = response.data.projects
	        });
	    }

	    $scope.getProjects();

	    $scope.addProject = function(project) {
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


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ }
]);