import * as angular from 'angular';
import 'angular-route';

import home from './home/home.module';
import example from './components/example/example.directive.ts';

angular.module('app', [
  'ngRoute',
  home,
  example
]).config(config);

/* @ngInject */
function config($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
