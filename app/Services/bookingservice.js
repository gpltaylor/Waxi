(function () {
    'use strict';
    angular.module('waxi.services').factory('BookingService', function ($location) {

        var name = "Booking Service";
        var activeModule = "bookingtickets";
        var departures = [];
        var arrivals = [];

        var locations = [
            { id: 1, name: "Dukes 92" },
            { id: 2, name: "Hotel Football" },
            { id: 3, name: 'Trafford Centre' }
        ];

        departures = locations;
        arrivals = locations;

        return {
            name: name,
            activeModule: activeModule,
            departures: departures,
            arrivals: arrivals
        }
    });
})();
