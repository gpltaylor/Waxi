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

        it('should restore Departure Date from local storage', function() {
            var newdate = new Date('2015-05-15T23:00:00.000Z');
            scope.bookingDetails.departure = scope.locations[2];
            scope.bookingDetails.departureDate = newdate;
            expect(scope.bookingDetails.departure.id).toBe(3);

            BookingService.saveBooking(scope.bookingDetails);
            BookingService.clearLocalBookingDetails();
            var bookingDetails = BookingService.restoreBooking();

            expect(bookingDetails).toBeDefined();
            expect(bookingDetails.departureDate.getTime()).toBe(newdate.getTime());
        });

        it('should restore Departure Time from local storage', function() {
            var newdate = new Date('2015-05-15T23:00:00.000Z');
            scope.bookingDetails.departure = scope.locations[2];
            scope.bookingDetails.departureDate = newdate;
            scope.bookingDetails.departureTime = scope.bookingDetails.departure.times[1];

            expect(scope.bookingDetails.departure.id).toBe(3);

            BookingService.saveBooking(scope.bookingDetails);
            BookingService.clearLocalBookingDetails();
            var bookingDetails = BookingService.restoreBooking();

            expect(bookingDetails).toBeDefined();
            expect(bookingDetails.departureTime).toBe(BookingService.locations[2].times[1]);
        });

        it('Payment booking years should contain last 10 years', function() {
           expect(scope.DatePicker.previousyears.length).toBe(10);
        });

        it('departure and arrival have values', function() {
            expect(scope.departures.length).toBe(3);
            expect(scope.arrivals.length).toBe(3);
        });

        it('check that watch for destination is working', function() {
            scope.bookingDetails.departure = scope.locations[2];
            ctrl.updateTimeTable(new Date());
            expect(scope.watchedHit).toBeTruthy();
            expect(scope.bookingDetails.departure.id).toBe(3);

            expect(scope.arrivals.length).toBe(2);

        });

        it('hide return details if ticket is not return type', function() {
            scope.bookingDetails.travelType = scope.travelTypes[0];
            expect(scope.bookingDetails.travelType.name).toBe("Single");
            expect(scope.isReturn()).toBeFalsy();
        });

        it('show correct times for given departure destination', function() {
            scope.bookingDetails.departure = scope.locations[2];
            expect(scope.bookingDetails.departure.times.length).toBe(2);
        });

    });
});