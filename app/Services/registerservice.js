(function () {
    'use strict';
    angular.module('waxi.services').factory('RegisterService', function ($http) {

        var name = "Register Service";

        var registerRequest = function (RegisterAccount, $scope) {
            RegisterAccount || {};
            RegisterAccount.DateRequested = new Date().toString();
            var ref = new Firebase("https://waxiuat.firebaseio.com");
            ref.createUser({
                email: RegisterAccount.EmailAddress,
                password: $scope.password
            }, function (error) {
                if (error === null) {
                    console.log("User created successfully");
                    var fb = new Firebase("https://waxiuat.firebaseio.com/RegisterAccounts/" + RegisterAccount.EmailAddress.replace('.', '%'));
                    return fb.set(RegisterAccount);
                } else {
                    console.log("Error creating user:", error);
                }
            });

        };

        return {
            name: name,
            registerRequest: registerRequest
        }
    });
})();
