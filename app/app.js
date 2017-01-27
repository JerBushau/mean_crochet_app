'use strict';

const angular = require('angular');
const bootstrap = require('angular-ui-bootstrap')

angular.module('crochetApp', [bootstrap]);

require('./scripts/services');
require('./scripts/directives');
require('./scripts/controllers');
