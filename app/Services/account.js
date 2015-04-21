(function () {
    'use strict';

    var myModule = angular.module('waxi.services');

    myModule.factory('AccountService', function ($http) {

        var name = "Account Service";

        var registerRequest = function (RegisterAccount) {
            return $http.post('/api/register', RegisterAccount);
        };
        var rootRef = new Firebase('https://waxiuat.firebaseio.com/web/uauth');

        // Handle third party login providers
        // returns a promise
        function thirdPartyLogin(provider) {
            var deferred = $.Deferred();

            rootRef.authWithOAuthPopup(provider, function (err, user) {
                if (err) {
                    deferred.reject(err);
                }

                if (user) {
                    deferred.resolve(user);
                }
            });

            return deferred.promise();
        }

        function routeTo(route) {
            window.location.href = '#/' + route;
        }

        // route to the specified route if sucessful
        // if there is an error, show the alert
        function handleAuthResponse(promise, route) {
            $.when(promise)
                .then(function (authData) {

                    // route
                    routeTo(route);

                }, function (err) {
                    console.log(err);
                    // pop up error
                    showAlert({
                        title: err.code,
                        detail: err.message,
                        className: 'alert-danger'
                    });

                });
        };

        var loginThirdParty = function (provider) {

            var socialLoginPromise = thirdPartyLogin(provider);
            return handleAuthResponse(socialLoginPromise, 'profile');
            
        };

        return {
            name: name,
            registerRequest: registerRequest
        }
    });
})();
