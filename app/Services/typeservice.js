﻿(function () {
    'use strict';
    var myModule = angular.module('waxi.services');

    /**
     * This module handles all types used within the system. Allows developers to quickly access all DTO types and view 
     * their current stucture.
     */
    myModule.factory('TypesService', function ($http) {

        var name = "Types Service";

        var DatePicker = {};
        DatePicker.days = [];
        DatePicker.years = [];
        DatePicker.previousyears = [];

        /*
         * Setup the values required for the Date Picker
         */
        function SetupDatePicker() {
            var x = 1;
            for (; x <= 31; x++) {
                DatePicker.days.push({ name: x, value: x });
            }

            var from, to;
            from = (new Date()).getFullYear();
            to = from + 10;
            for (; from < to; from++) {
                DatePicker.years.push({ name: from, value: from });
            }

            // Setup payment years
            to = (new Date()).getFullYear();
            from = to - 10;
            for (; from < to; from++) {
                DatePicker.previousyears.push({ name: from, value: from });
            }

            DatePicker.months = [];
            DatePicker.months.push({ name: '1 - Jan', value: 1 });
            DatePicker.months.push({ name: '2 - feb', value: 2 });
            DatePicker.months.push({ name: '3 - March', value: 3 });
            DatePicker.months.push({ name: '4 - April', value: 4 });
            DatePicker.months.push({ name: '5 - May', value: 5 });
            DatePicker.months.push({ name: '6 - june', value: 6 });
            DatePicker.months.push({ name: '7 - July', value: 7 });
            DatePicker.months.push({ name: '8 - August', value: 8 });
            DatePicker.months.push({ name: '9 - September', value: 9 });
            DatePicker.months.push({ name: '10 - October', value: 10 });
            DatePicker.months.push({ name: '11 - November', value: 11 });
            DatePicker.months.push({ name: '12 - December', value: 12 });

        };

        /*
         * Return the DatePicker Model that holds information required to setup the date select values
         */
        var getDatePickerOptions = function () {
            if (DatePicker === undefined || DatePicker.days === undefined || DatePicker.days.length === 0) {
                SetupDatePicker();
            }
            return DatePicker;
        };

        /**
         * Return a model used to creating a Register Account request
         */
        var getRegisterAccount = function () {
            var model = {
                MemberId: -1, EmailAddress: null, FirstName: null, Surname: null, DateOfBirth: null, Sex: null
            }

            return model;
        };

        return {
            name: name,
            getDatePickerOptions: getDatePickerOptions,
            getRegisterAccount: getRegisterAccount
        }
    });
})();
