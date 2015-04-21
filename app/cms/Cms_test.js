'use strict';

describe('CMS', function () {

    beforeEach(module('waxi.controllers'));

    describe('CmsCtrl', function () {

        var ctrl, scope, location;
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, $location) {
            scope = $rootScope.$new();
            location = $location;
            ctrl = $controller('CmsCtrl', {$scope: scope, $location: location});
        }));

        it('should produce controller', function () {
            expect(ctrl).toBeDefined();
            expect(typeof scope.navigateTo).toBe("function");
        });

    });
});