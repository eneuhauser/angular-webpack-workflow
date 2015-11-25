import * as angular from 'angular';
import 'angular-route';

import index from './index/index.module';
import example from './components/example/example.directive.ts';

angular.module('app', [
  'ngRoute',
  index,
  example
]).config(config);

/* @ngInject */
function config($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
