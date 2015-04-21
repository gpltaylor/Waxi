angular.module('waxi.controllers')
.controller('AdminCtrl', ['$scope', '$location', 'TypesService', 'DataService', function ($scope, $location, TypesService, DataService) {
    $scope.AccountRequests = function () {

        var updateAccountRequests = function (data) {
            $scope.accountRequests = data;

            // Update if data is from a Firebase triggered event
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        };

        var failed = function (data) {
            alert("Sorry but there was an error - please contact support")
        };

        DataService.accountRequests(updateAccountRequests).then(updateAccountRequests, failed);
    };

}])