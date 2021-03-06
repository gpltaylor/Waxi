angular.module('waxi.account')
.controller('LoginCtrl', ['$scope', '$location', 'AccountService', '$firebaseAuth', '$firebase', 'DataService', function ($scope, $location, AccountService, $firebaseAuth, $firebase, DataService) {
    $scope.CurrentUser = AccountService.CurrentUser;
    $scope.hits = AccountService.hits;
    $scope.username = "";
    $scope.password = "";

    $scope.$watch(function (scope) { return AccountService.CurrentUser },
        function (newValue, oldValue) {
            console.log("Watch: ", oldValue, newValue);
            $scope.CurrentUser = newValue;
        });


    var IncHits = function () {
        AccountService.hits++;
        $scope.hits = AccountService.hits;
    }

    $scope.name = AccountService.name;
    $scope.IncHits = IncHits;
    $scope.loginStatus = "";

    var ref = new Firebase('https://waxiuat.firebaseio.com');

    $scope.loginEmailPassword = function () {
        var auth = $firebaseAuth(ref);

        $scope.userdata = "";
        auth.$authWithPassword({
            email: $scope.username,
            password: $scope.password
        }).then(function (authData) {
            // user authenticated with Firebase
            //$scope.UserLogin = true;
            AccountService.CurrentUser = authData.password.email;
            DataService.populateUserData(authData.password.email);
            sessionStorage.setItem("AuthToken", JSON.stringify(authData));
            $location.url("/booking/home");
        }).catch(function (error) {
            console.log("Error authenticating user:", error);
            $scope.loginStatus = "Login Failed - " + error.message;
        });

    };

    $scope.loginThirdParty = function (provider) {

        var auth = $firebaseAuth(ref);
        auth.$authWithOAuthPopup(provider, { scope: "email" }).then(function (authData) {
            sessionStorage.setItem("AuthToken", JSON.stringify(authData));

            if (provider === 'google') {
                AccountService.CurrentUser = authData.google.displayName;
                $scope.CurrentEmail = authData.google.email;
                $scope.googledata = { Name: authData.google.displayName };
                DataService.populateUserData($scope.CurrentEmail);
                console.log("User Name is: ", authData.google.displayName);
            } else if (provider === 'facebook') {
                AccountService.CurrentUser = authData.facebook.displayName;
                $scope.CurrentEmail = authData.facebook.email;
                $scope.facebookdata = { Name: authData.facebook.displayName };
                DataService.populateUserData($scope.CurrentEmail);
                console.log("User Name is: ", authData.facebook.displayName);
            }

            $location.url("/booking/home");

        }).catch(function (error) {
            console.error("Authentication failed: ", error);
        });
    };


    $scope.logout = function () {
        AccountService.CurrentUser = null;
        sessionStorage.setItem("AuthToken", null);
    };

    //$scope.$watch($scope.hits, $scope.username, $scope.password);
}])