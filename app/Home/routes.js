'use strict';

angular.module('waxi.Home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'App/Home/home.html',
        controller: 'MenuCtrl'
    });
}]);