//import * as angular from 'angular';
//import 'angular-mocks/angular-mocks';
import HomeModule from './home.module';

// This needs to be defined to enable using 'require' in TypeScript
//declare function require(string): string;

describe('home.controller', function() {
  var $rootScope, $controller, $q, ctrl;

  beforeEach(angular.mock.module(HomeModule));

  beforeEach(angular.mock.inject(function(_$controller_, _$q_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $controller = _$controller_;
    ctrl = $controller('HomeController', {});
  }));

  it('can run', function() {
    expect(ctrl.name).toBe('World');
  });

});
