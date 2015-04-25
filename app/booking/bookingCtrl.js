'use strict';

/*
Booking controller handles the UI for the Booking Wizard. Allowing for the steps to resever and pay for a seat.
This needs to be dynamic in nature as the workflow for this may change.
*/
var app = angular.module('waxi.booking');

app.controller('BookingCtrl', ['$scope', '$location', '$filter', 'TypesService', 'AccountService', 'BookingService',
    function ($scope, $location, $filter, TypesService, AccountService, BookingService) {

        $scope.name = "Booking Controller";
        $scope.departures = BookingService.departures;
        $scope.arrivals = BookingService.arrivals;

        if (BookingService.bookingDetails != undefined) {
            $scope.bookingDetails = BookingService.bookingDetails;
        } else {
            $scope.bookingDetails = {
                ticketType: '',
                numAdults: 0,
                numChildren: 0,
                departure: '',
                arrival: '',
                depatureDate: new Date(),
                returnDate: new Date()
            };
        }

        $scope.gotoPayment = function () {
            BookingService.bookingDetails = $scope.bookingDetails;
            $location.url("/booking/payment");
        };

        $scope.gotoConfirmation = function () {
            BookingService.bookingDetails = $scope.bookingDetails;
            $location.url("/booking/success");
        };

    }]);