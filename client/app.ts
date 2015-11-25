import * as angular from 'angular';
import 'angular-route';

import index from './index/index.module';
import exAmple from './components/ex-ample/ex-ample.directive.ts';

angular.module('app', [
  'ngRoute',
  index,
  exAmple
]).config(config);

/* @ngInject */
function config($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
