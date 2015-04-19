'use strict';

// Declare app level module which depends on filters, and services
angular.module('waxi.booking').
    config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/booking', { templateUrl: 'app/booking/tickets.html', controller: 'BookingCtrl' });
        $routeProvider.when('/booking/home', { templateUrl: 'app/booking/tickets.html', controller: 'BookingCtrl' });
        $routeProvider.when('/booking/tickets', { templateUrl: 'app/booking/tickets.html', controller: 'BookingCtrl' });
        $routeProvider.when('/booking/payment', { templateUrl: 'app/booking/payment.html', controller: 'BookingCtrl' });
        $routeProvider.when('/booking/success', { templateUrl: 'app/booking/success.html', controller: 'BookingCtrl' });
        $routeProvider.when('/booking/failed', { templateUrl: 'app/booking/failed.html', controller: 'BookingCtrl' });

    }]);