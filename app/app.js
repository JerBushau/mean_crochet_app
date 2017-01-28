'use strict';

const angular = require('angular');
const bootstrap = require('angular-ui-bootstrap');
const animate = require('angular-animate');

angular.module('crochetApp', [bootstrap, animate]);

require('./scripts/services');
require('./scripts/directives');
require('./scripts/controllers');
