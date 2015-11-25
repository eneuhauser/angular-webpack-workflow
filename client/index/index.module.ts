import * as angular from 'angular';
import IndexController from './index.controller';

import './index.scss';
const indexTemplateUrl = require('./index.html');
const indexControllerName = 'IndexController';

export default angular.module('app.index', [ 'ngRoute' ])
  .controller(indexControllerName, IndexController)
  .config(config).name;

/* @ngInject */
function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: indexTemplateUrl,
    controller: indexControllerName,
    controllerAs: 'index'
  });
}
