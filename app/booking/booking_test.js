'use strict';

describe('Booking', function () {

    beforeEach(module('waxi.Booking'));
    beforeEach(function () {
        module('waxi');
        module('waxi.controllers');
    });

    describe('BookingCtrl', function () {

        var ctrl, scope, location, filter, typesService, accountService, bookingService;
        //$scope, $location, $filter, TypesService, AccountService, BookingService
        beforeEach(inject(function ($rootScope, $controller, location, filter, TypeService, AccountService, BookingService) {
            scope = $rootScope.$new();
            ctrl = $controller('CmsCtrl', {$scope: scope});
        }));

        it('should produce controller', function () {
            expect(ctrl).toBeDefined();

        });

    });
});