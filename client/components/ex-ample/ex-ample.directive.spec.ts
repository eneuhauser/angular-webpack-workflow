import ExAmpleDirective from './ex-ample.directive';

describe('ex-ample.directive', function() {
  var $compile, $rootScope;

  // Declare the directive
  beforeEach(angular.mock.module(ExAmpleDirective));

  // Mock the service
  beforeEach(angular.mock.module({
      exAmpleService: {
        retrieveOrigin: function() {
          return { then: function(success) { success('127.0.0.1'); } };
        }
      }
  }));

  // Inject libraries needed for testing
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('can test directives', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<ex-ample></ex-ample>')($rootScope);
    // fire all the watches, so the directive will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('Your IP is 127.0.0.1');
  });

});
