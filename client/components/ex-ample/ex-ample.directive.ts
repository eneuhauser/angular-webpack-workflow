/**
 * This is an example directive. Note, all directives *should* be at least two
 * words. This will prevent collisions with new tags that get added to HTML.
 */
import * as angular from 'angular';
//import Factory from './ex-ample.factory';
import Service from './ex-ample.service';

import './ex-ample.scss';

export default angular.module('app.exAmple', [])
  .directive('exAmple', exAmpleDirective)
  .service('exAmpleService', Service)
  .name;

function exAmpleDirective() {
  const directive = {
    restrict: 'AE',
    scope: {},
    templateUrl: require('./ex-ample.directive.html'),
    controllerAs: 'vm',
    controller: exAmpleController
  };

  return directive;
}

// @ngInject
function exAmpleController(exAmpleService) {
  const vm = this;

  exAmpleService.retrieveOrigin().then(function(origin) {
    vm.title = `Your IP is ${origin}`;
  }, function() {
    vm.title = 'Unable to get your IP';
  });
}
