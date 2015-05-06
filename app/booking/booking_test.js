'use strict';

describe('Booking', function () {

    beforeEach(function() {
        module('ngRoute');
        module('waxi.booking');
        module('waxi.services');
    });

    describe('BookingCtrl', function () {
 
        var ctrl, scope, location, filter, BookingService;
        //$scope, $location, $filter, TypesService, AccountService, BookingService
        beforeEach(inject(function ($rootScope, $controller, $location, $filter, TypesService, AccountService, _BookingService_) {
            scope = $rootScope.$new();
            location = $location;
            BookingService = _BookingService_;

            // Reset the data so we are fresh for every it block
            BookingService.flushAll();

            ctrl = $controller('BookingCtrl', {$scope: scope, $location: $location, $filter: $filter, TypesService: TypesService, AccountService: AccountService, BookingService: _BookingService_});
        }));

        it('should produce controller', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have list of ports', function() {
            expect(scope.locations).toBeDefined();
        });

        it('should go to payment page if valid', inject(function() {
            spyOn(location, 'path');
            spyOn(BookingService, 'saveBooking')

            scope.gotoPayment();

            expect(location.path).toHaveBeenCalledWith('/booking/payment');
            expect(BookingService.saveBooking).toHaveBeenCalled();
        }));

        it('should have travelTypes', function() {
            expect(scope.travelTypes[0].name).toBe('Single');
            expect(scope.travelTypes[1].name).toBe('Return');

            expect(scope.travelTypes.length).toBe(2);
        });

        it('should have default booking details', function() {
            //scope.bookingDetails.travelType = "1";

            var bookingDetails = BookingService.restoreBooking();
            expect(bookingDetails.travelType.name).toBe('Single');
            expect(bookingDetails.numAdults).toBe(1);
            expect(bookingDetails.numChildren).toBe(0);
            expect(bookingDetails.departure.id).toBe(1);

            // Make sure same item existing within scope.
            expect(bookingDetails).toBe(scope.bookingDetails);

        });

        it('should store data to local storage', function() {
            scope.bookingDetails.numAdults = 4;

            BookingService.saveBooking(scope.bookingDetails);
            BookingService.clearLocalBookingDetails();
            var bookingDetails = BookingService.restoreBooking();

            expect(bookingDetails).toBeDefined();
            expect(bookingDetails.numAdults).toBe(4);
        });

        xit('should assign a travel type to departure item', function() {
           // TODO: Update to store the Travel Item that indicates when/where the user will depart form a port
        });

    });
});