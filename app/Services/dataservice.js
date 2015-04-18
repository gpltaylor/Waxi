(function () {
    'use strict';
    var myModule = angular.module('waxi.services');

    myModule.factory('DataService', function ($http, $q, $firebase) {

        var name = "Data Service";
        var serviceuri = "";

        var accountRequests = function (cb) {

            // Return a promise that resolves when the data is returned
            return $q(function (resolve, reject) {
                var postsRef = new Firebase("https://waxiuat.firebaseio.com/RegisterAccounts");
                // Attach an asynchronous callback to read the data at our posts reference
                postsRef.on('value', function (snapshot) {
                    console.log(snapshot.val());
                    if (typeof cb === "function") {
                        cb(snapshot.val());
                    }
                    resolve(snapshot.val());
                }, function (errorObject) {
                    console.log('The read failed: ' + errorObject.code);
                    reject(errorObject);
                });
            });
        };

        var populateUserData = function (email) {
            if (email === undefined) { return; }
            var dataref = new Firebase('https://waxiuat.firebaseio.com/RegisterAccounts/' + email.replace('.', '%'));
            var userdataSync = $firebase(dataref);
            var userdataobject = userdataSync.$asObject();
            //userdataobject.$bindTo($scope, 'userdata');
        };

        return {
            name: name,
            accountRequests: accountRequests,
            populateUserData: populateUserData
        }
    });
})();
