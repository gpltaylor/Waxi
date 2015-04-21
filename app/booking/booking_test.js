'use strict';

describe('Booking', function () {

    beforeEach(module('waxi.controllers'));
    beforeEach(function() {
        module('waxi.services');
    });


    describe('BookingCtrl', function () {

        var ctrl, scope, location, filter, typesService, accountService, bookingService;
        //$scope, $location, $filter, TypesService, AccountService, BookingService
        beforeEach(inject(function ($rootScope, $controller, $location, $filter, TypesService) {
            scope = $rootScope.$new();
            ctrl = $controller('BookingCtrl', {$scope: scope, $location: location, $filter: filter, TypesService: TypesService});
        }));

        it('should produce controller', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have list of ports', function() {
               expect(scope.departures).toBeDefined();
            });

    });
});