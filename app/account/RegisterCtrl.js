angular.module('waxi.account')
.controller('RegisterCtrl', ['$scope', '$location', 'TypesService', 'RegisterService', function ($scope, $location, TypesService, RegisterService) {
    $scope.Register = TypesService.getRegisterAccount();
    $scope.DatePicker = TypesService.getDatePickerOptions();
    $scope.activeModule = "register";

    $scope.registerRequest = function () {
        var process = function (data) {
            if (data.status !== 200) {
                console.log("Error:", data);
                return;
            }

            console.log("Process: ", data);
        };

        // Convert Date of Birth
        try {
            var datetoparse = $scope.year.value + ' ' + $scope.month.value + ' ' + $scope.day.value;
            datetoparse = moment(datetoparse, "YYYY MM DD");
            $scope.Register.DateOfBirth = datetoparse._d.toString();
        }
        catch (err) {
            fail(err);
            return;
        }

        RegisterService.registerRequest($scope.Register, $scope);
        $scope.activeModule = "registersuccess";
    };

}])