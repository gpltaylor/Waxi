(function () {
    'use strict';
    angular.module('waxi.services').factory('BookingService', function ($location) {

        var name = "Booking Service";
        var activeModule = "bookingtickets";
        var travelTypes = [
            {id: 1, name: 'Single'},
            {id: 2, name: 'Return'}
        ];

        var bookingDetails;
        var localStorageKey = 'bookingDetails';

        var locations = [
            // TODO: Add Weekday and duplicate all items allowing for different time table per day
            {id: 1, name: "Dukes 92", times: [
                {hour: 9, minutes:0, direction: 0},
                {hour: 18, minutes:0, direction: 1}
            ]},
            {id: 2, name: "Hotel Football", times:[
                {hour: 11, minutes:0, direction: 0},
                {hour: 16, minutes:0, direction: 1}
            ]},
            {id: 3, name: 'Trafford Centre', times: [
                {hour: 13, minutes:0, direction: 0},
                {hour: 14, minutes:0, direction: 1}
            ]}
        ];

        function saveBooking(_bookingDetails_) {
            bookingDetails = _bookingDetails_;
            localStorage.setItem(localStorageKey, JSON.stringify(_bookingDetails_));
        };

        function restoreBooking() {
            var storageData;
            if (bookingDetails != undefined) {
                return bookingDetails;
            }

            if (typeof localStorage.getItem(localStorageKey) === "string") {
                if(localStorage.getItem(localStorageKey) !== "undefined") {
                    storageData = JSON.parse(localStorage.getItem(localStorageKey));

                    // Need to use the local array item as the original data
                    // There must be a pointer reference to the locations array and this breaks when using storage in this manor
                    // TODO: Review ngStorage to see if it fixes this issue
                    // TODO: If ngStorage does not work replace this with Reactive Extensions so we don't have index driven logic
                    storageData.travelType = travelTypes[storageData.travelType.id-1];
                    storageData.departure = locations[storageData.departure.id-1];
                    storageData.arrival = locations[storageData.arrival.id-1];
                    return storageData;
                }
            }

            bookingDetails = {
                travelType: travelTypes[0],
                numAdults: 1,
                numChildren: 0,
                departure: locations[0],
                arrival: locations[0],
                departureDate: {},
                returnDate: {}
            };

            return bookingDetails;

        };

        /**
         * Clear down the local booking details.
         * This is mainly used for Unit Testing to make sure we are pulling data out of local storage when expected.
         * We been to clear the local booking details otherwise the code will use this as cached data.
         * TODO: I am not a fan of adding method just for testing so look to refactor this
         */
        function clearLocalBookingDetails() {
          bookingDetails = null;
        };

        function clearStorageBookingDetails() {
            localStorage.removeItem(localStorageKey);
        };

        /**
         * Removes any data be it in the local service or within storage.
         * This is useful when the booking is completed and we want to remove it
         */
        function flushAll() {
            clearLocalBookingDetails();
            clearStorageBookingDetails();
        };

        return {
            name: name,
            activeModule: activeModule,
            travelTypes: travelTypes,
            saveBooking: saveBooking,
            restoreBooking: restoreBooking,
            clearLocalBookingDetails: clearLocalBookingDetails,
            flushAll: flushAll,
            locations: locations
        }
    });
})();
