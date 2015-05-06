'use strict';

/*
Booking controller handles the UI for the Booking Wizard. Allowing for the steps to resever and pay for a seat.
This needs to be dynamic in nature as the workflow for this may change.
*/
var app = angular.module('waxi.booking');

app.controller('BookingCtrl', ['$scope', '$location', '$filter', 'TypesService', 'AccountService', 'BookingService',
    function ($scope, $location, $filter, TypesService, AccountService, BookingService) {

        $scope.name = "Booking Controller";
        $scope.locations = BookingService.locations;
        $scope.travelTypes = BookingService.travelTypes;
        $scope.DatePicker = TypesService.getDatePickerOptions();

        $scope.bookingDetails = BookingService.restoreBooking();

        $scope.gotoPayment = function (bookingDetails) {
            BookingService.saveBooking(bookingDetails);
            $location.url("/booking/payment");
        };

        $scope.gotoConfirmation = function (bookingDetails) {
            BookingService.saveBooking(bookingDetails);
            $location.url("/booking/success");
        };

    }]);