import * as angular from 'angular';
import HomeController from './home.controller';

// This needs to be defined to enable using 'require' in TypeScript
declare function require(string): string;

import './home.scss';
const homeTemplateUrl = require('./home.html');
const homeControllerName = 'HomeController';

const homeModule = angular.module('app.home', [ 'ngRoute' ])
  .controller(homeControllerName, HomeController)
  .config(config);

/* @ngInject */
function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: homeTemplateUrl,
    controller: homeControllerName,
    controllerAs: 'home'
  });
}
//config.$inject = [ '$routeProvider' ];

export default homeModule.name;
