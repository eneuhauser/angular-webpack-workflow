import exAmpleService from './ex-ample.service';

describe('ex-ample.service', function() {
  var exAmpleService, $httpBackend;

  // Declare the module
  beforeEach(angular.mock.module('app.exAmple'));

  // Inject libraries needed for testing
  beforeEach(angular.mock.inject(function(_exAmpleService_, _$httpBackend_) {
    exAmpleService = _exAmpleService_;
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', 'http://httpbin.org/get').respond({ origin:'127.0.0.1' });
  }));

  it('can test services', function() {
    $httpBackend.expectGET('http://httpbin.org/get');
    exAmpleService.retrieveOrigin().then(function(origin) {
      expect(origin).toBe('127.0.0.1');
    });
    $httpBackend.flush();
  });

  it('can test error conditions', function() {
    $httpBackend.expectGET('http://httpbin.org/get').respond(500, '');
    exAmpleService.retrieveOrigin().then(function(origin) {
      expect(origin).toBe('Error');
    });
    $httpBackend.flush();
  });

});
