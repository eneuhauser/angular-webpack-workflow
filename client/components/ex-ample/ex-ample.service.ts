export default class Service {

  // This is needed for the TypeScript compiler
  private _$http;

  // @ngInject
  constructor($http) {
    this._$http = $http;
  }

  retrieveOrigin() {
    return this._$http.get('http://httpbin.org/get').then(function(response) {
      return response.data.origin;
    }, function() {
      return 'Error';
    });
  }
}
