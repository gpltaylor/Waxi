(function () {
    'use strict';
    var myDirectives = angular.module('waxi.directives', []);
    //var myDirectives = angular.module('waxi.directives');

    myDirectives.directive('waxiSelect', function () {
        return {
            templateUrl: 'App/directives/select.html'
        };
    });

})();