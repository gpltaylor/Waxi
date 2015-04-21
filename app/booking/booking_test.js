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
            ctrl = $controller('BookingCtrl', {$scope: scope, $location: $location, $filter: $filter, TypesService: TypesService, AccountService: AccountService, BookingService: BookingService});
        }));

        it('should produce controller', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have list of ports', function() {
            expect(scope.departures).toBeDefined();
        });

    });
});