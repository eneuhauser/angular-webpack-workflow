import * as angular from 'angular';
import 'angular-mocks/angular-mocks';
import IndexModule from './index.module';

describe('index.controller', function() {
  var $rootScope, $controller, $q, ctrl;

  beforeEach(angular.mock.module('app.index'));

  beforeEach(angular.mock.inject(function(_$controller_, _$q_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $controller = _$controller_;
    ctrl = $controller('IndexController', {});
  }));

  it('can run', function() {
    expect(ctrl.name).toBe('World');
  });

});
