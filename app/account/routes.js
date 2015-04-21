'use strict';

// Declare app level module which depends on filters, and services
angular.module('waxi.account').
    config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/account/login', { templateUrl: 'App/account/login.html', controller: 'LoginCtrl' });
        $routeProvider.when('/account/register', { templateUrl: 'App/account/register.html', controller: 'RegisterCtrl' });

    }]);