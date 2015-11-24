import * as angular from 'angular';
import './example.scss';

// This needs to be defined to enable using 'require' in TypeScript
declare function require(string): string;

export default angular.module('app.exampleDirective', [])
  .directive('exampleDirective', exampleDirective)
  .name;

function exampleDirective() {
  const directive = {
    restrict: 'AE',
    scope: {},
    templateUrl: require('./example.directive.html'),
    controllerAs: 'vm',
    controller: exampleController
  };

  return directive;
}

function exampleController() {
  const vm = this;

  vm.someValue = true;
}
