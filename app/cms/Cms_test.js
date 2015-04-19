'use strict';

describe('CMS', function () {

    beforeEach(module('waxi.controllers'));
    beforeEach(function () {
        module('firebase');
    });

    describe('CmsCtrl', function () {

        var ctrl, scope, location;
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            console.log("Scope", scope);

            scope = $rootScope.$new();
            location = $location;
            ctrl = $controller('CmsCtrl', {$scope: scope, $location: location});
        }));

        it('should produce controller', function () {
            expect(ctrl).toBeDefined();
        });

    });
});