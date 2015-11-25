import ExAmpleDirective from './ex-ample.directive';

describe('ex-ample.directive', function() {
  var $compile, $rootScope;

  beforeEach(angular.mock.module(ExAmpleDirective));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('can run', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<ex-ample></ex-ample>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('Sample Directive');
  });

});
