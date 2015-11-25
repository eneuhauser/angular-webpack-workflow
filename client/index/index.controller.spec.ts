import IndexModule from './index.module';

describe('index.controller', function() {
  var ctrl;

  beforeEach(angular.mock.module(IndexModule));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    var scope = $rootScope.$new();
    ctrl = $controller('Index', {
      $scope: scope
    });
  }));

  it('can run', function() {
    expect(ctrl.name).toBe('World');
  });

});
