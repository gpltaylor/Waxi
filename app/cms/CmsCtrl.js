'use strict';

angular.module('waxi.controllers')
    .controller('CmsCtrl', ['$scope', '$location', function ($scope, $location) {

        $scope.navigateTo = function (data) {
            console.log("navigateTo:", data);

            if (data === 'login') {
                $location.url("/account/login");
            } else if (data === 'register') {
                $location.url("/account/register");
            } else if (data === 'booking') {
                $location.url("/booking/home");
            } else if (data === 'home') {
                $location.url("/cms/home");
            }
        };

    }]);