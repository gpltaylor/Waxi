'use strict';

// Setup Namespaces
angular.module('waxi.controllers', []);
angular.module('waxi.booking', ['waxi.services']);

// Default Module
angular.module('waxi', [
    'ngRoute',
    'waxi.controllers',
    'waxi.booking'
]);

// Declare app level module which depends on filters, and services
angular.module('waxi').
config(['$routeProvider', function ($routeProvider) {
    //$routeProvider.when('/account/login', { templateUrl: 'App/partials/account/login.html', controller: 'LoginCtrl' });
    //$routeProvider.when('/account/register', { templateUrl: 'App/partials/account/register.html', controller: 'RegisterCtrl' });
    //$routeProvider.when('/admin/home', { templateUrl: 'App/partials/admin/index.html', controller: 'AdminCtrl' });

    $routeProvider.when('/', { templateUrl: 'App/cms/index.html', controller: 'CmsCtrl' });
    $routeProvider.otherwise({ redirectTo: '/cms/home' });
}]);