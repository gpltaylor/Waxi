'use strict';

// Setup Namespaces
angular.module('waxi.controllers', []);

// Declare app level module which depends on filters, and services
angular.module('waxi', [
  'ngRoute',
  'waxi.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/account/login', { templateUrl: 'App/partials/account/login.html', controller: 'LoginCtrl' });
    $routeProvider.when('/account/register', { templateUrl: 'App/partials/account/register.html', controller: 'RegisterCtrl' });
    $routeProvider.when('/admin/home', { templateUrl: 'App/partials/admin/index.html', controller: 'AdminCtrl' });

    $routeProvider.when('/booking', { templateUrl: 'App/partials/booking/tickets.html', controller: 'BookingCtrl' });
    $routeProvider.when('/booking/home', { templateUrl: 'App/partials/booking/tickets.html', controller: 'BookingCtrl' });
    $routeProvider.when('/booking/tickets', { templateUrl: 'App/partials/booking/tickets.html', controller: 'BookingCtrl' });
    $routeProvider.when('/booking/payment', { templateUrl: 'App/partials/booking/payment.html', controller: 'BookingCtrl' });
    $routeProvider.when('/booking/success', { templateUrl: 'App/partials/booking/success.html', controller: 'BookingCtrl' });
    $routeProvider.when('/booking/failed', { templateUrl: 'App/partials/booking/failed.html', controller: 'BookingCtrl' });

    $routeProvider.otherwise({ redirectTo: '/cms/home' });
}]);