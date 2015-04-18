(function () {
    'use strict';

    var myDirectives = angular.module('waxi.directives');

    myDirectives.directive('waxiButton', function () {
        return {
            templateUrl: 'App/directives/waxibutton.html'
        };
    });
})();