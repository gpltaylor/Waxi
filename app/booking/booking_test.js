'use strict';

describe('Booking', function () {

    beforeEach(function() {
        module('ngRoute');
        module('waxi.booking');
        module('waxi.services');
    });

    describe('BookingCtrl', function () {
 
        var ctrl, scope, location, filter;
        //$scope, $location, $filter, TypesService, AccountService, BookingService
        beforeEach(inject(function ($rootScope, $controller, $location, $filter, TypesService, AccountService, BookingService) {
            scope = $rootScope.$new();
            location = $location;
            ctrl = $controller('BookingCtrl', {$scope: scope, $location: $location, $filter: $filter, TypesService: TypesService, AccountService: AccountService, BookingService: BookingService});
        }));

        it('should produce controller', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have list of ports', function() {
            expect(scope.departures).toBeDefined();
        });

        it('should be valid form data', function() {
            expect($("input").length).toBe(1);
            //expect($("input[ng-model='bookingDetails.numAdults']")[0].classList.contains("ng-invalid")).toEqual(true);
        });

        it('should go to payment page if valid', inject(function() {
            spyOn(location, 'path');

            scope.gotoPayment();

            expect(location.path).toHaveBeenCalledWith('/booking/payment');
        }));

    });
});