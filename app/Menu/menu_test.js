'use strict';

xdescribe('MenuCtrl', function () {

    beforeEach(module('waxi.Menu'));
    beforeEach(function() {
        module('waxi');
    });

    describe('MenuCtrl', function () {

        var ctrl, scope, PodService;
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, PodService) {
            scope = $rootScope.$new();
            ctrl = $controller('MenuCtrl', {$scope: scope, PodService: PodService});
        }));

        it('should contain Categories', function () {
            expect(scope).toBeDefined();
            expect(scope.cats.length).toBe(3);
        });

    });

    describe('selected Pod', function() {

        var ctrl, scope, podService;
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, PodService) {
            scope = $rootScope.$new();
            podService = PodService;
            ctrl = $controller('MenuCtrl', {$scope: scope, PodService: podService});
        }));

        it('should have first pod selected', function () {
            expect(scope).toBeDefined();
            expect(scope.cats.length).toBe(3);

            var firstPod = scope.cats[0].pods[0];

            expect(firstPod).toBeDefined();
            expect(firstPod.selected).toBeTruthy();
        });

        it('Selecting a Pod should flip \'selected\' attribute', function() {
            scope.select(scope.cats[0].pods[1]);
            var pod = scope.cats[0].pods[0];
            expect(pod.selected).toBe(false);

            pod = scope.cats[0].pods[1];
            expect(pod.selected).toBe(true);
        });

        it('Can have only one selected pod', function() {
            scope.select(scope.cats[0].pods[0]);
            scope.select(scope.cats[0].pods[1]);
            scope.select(scope.cats[0].pods[2]);

            expect(podService).toBeDefined();

            var itemIt = 0;
            podService.pods
                .filter(function (pod) { return pod.selected === true; })
                .map(function (pod) { return pod; })
                .forEach(function (pod) { itemIt++; });

            expect(itemIt).toBe(1);

        });

    });

});