/**
 * This is an example directive. Note, all directives *should* be at least two
 * words. This will prevent collisions with new tags that get added to HTML.
 */
import * as angular from 'angular';
import './ex-ample.scss';
import template from './ex-ample.directive.html';

export default angular.module('app.exAmple', [])
  .directive('exAmple', exAmpleDirective)
  .name;

function exAmpleDirective() {
  const directive = {
    restrict: 'AE',
    scope: {},
    templateUrl: template,
    controllerAs: 'vm',
    controller: exAmpleController
  };

  return directive;
}

function exAmpleController() {
  const vm = this;

  vm.title = 'Sample Directive';
}
