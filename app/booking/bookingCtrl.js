'use strict';

/*
Booking controller handles the UI for the Booking Wizard. Allowing for the steps to resever and pay for a seat.
This needs to be dynamic in nature as the workflow for this may change.
*/
var app = angular.module('waxi.booking');

app.controller('BookingCtrl', ['$scope', '$location', '$filter', 'TypesService', 'AccountService', 'BookingService',
    function ($scope, $location, $filter, TypesService, AccountService, BookingService) {
        var that = this;
        $scope.name = "Booking Controller";
        $scope.locations = BookingService.locations;
        $scope.travelTypes = BookingService.travelTypes;
        $scope.DatePicker = TypesService.getDatePickerOptions();

        $scope.departures = BookingService.locations;
        $scope.arrivals = BookingService.locations;
        $scope.bookingDetails = BookingService.restoreBooking();

        $scope.$watch(function(scope) { return $scope.bookingDetails.departure },
            function(newval, oldval) {
                that.updateTimeTable(new Date());
                console.log("Wacher", $scope);
            }
        );

        $scope.gotoPayment = function (bookingDetails) {
            BookingService.saveBooking(bookingDetails);
            $location.url("/booking/payment");
        };

        $scope.gotoConfirmation = function (bookingDetails) {
            BookingService.saveBooking(bookingDetails);
            $location.url("/booking/success");
        };

        $scope.isReturn = function() {
            return $scope.bookingDetails.travelType.id == 2;
        };

        /*
            Look at the selected departure value and update the dropdown list available to it.
            This needs to loop the current time (passed in for testing reasons) and filter the arrival list
            based of the timetable
         */
        this.updateTimeTable = function(timenow) {
            $scope.watchedHit = true;
            var formatedDate = moment(timenow || new Date());

            var currrentHour = formatedDate.get("hour");
            var currentMinutes = formatedDate.get("minutes");

            // find location for destination where the time (hour/minute) is greater than now
            // Need to filter!

            // The Depature and Arrival cant be the same place.
            var data = BookingService.locations.filter(function(location) {
                return location.id != $scope.bookingDetails.departure.id;
            });

            $scope.arrivals = data;
        };

    }]);