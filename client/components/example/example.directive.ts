import * as angular from 'angular';

import './example.scss';
import template from './example.directive.html';

export default angular.module('app.exampleDirective', [])
  .directive('exampleDirective', exampleDirective)
  .name;

/* ngInject */
function exampleDirective() {
  const directive = {
    restrict: 'AE',
    scope: {},
    template: template,
    controllerAs: 'vm',
    controller: exampleController
  };

  return directive;
}

/* ngInject */
function exampleController() {
  const vm = this;

  vm.someValue = true;
}
