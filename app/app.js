'use strict';

// Setup Namespaces
angular.module('waxi.controllers', []);
angular.module('waxi.account', ['firebase']);
angular.module('waxi.booking', ['waxi.services']);
angular.module('waxi.services', []);
angular.module('waxi.admin', []);

// Default Module
angular.module('waxi', [
    'ngRoute',
    'waxi.controllers',
    'waxi.booking',
    'waxi.account',
    'waxi.admin'
]);

// Declare app level module which depends on filters, and services
angular.module('waxi').
config(['$routeProvider', function ($routeProvider) {

    //$routeProvider.when('/admin/home', { templateUrl: 'App/partials/admin/index.html', controller: 'AdminCtrl' });

    $routeProvider.when('/', { templateUrl: 'App/cms/index.html', controller: 'CmsCtrl' });
    $routeProvider.otherwise({ redirectTo: '/cms/home' });
}]);