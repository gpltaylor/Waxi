'use strict';

angular.module('waxi.Menu', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/menu', {
            templateUrl: 'App/Menu/home.html',
            controller: 'MenuCtrl'
        }).when('/menu/base', {
            templateUrl: 'App/Menu/home.html',
            controller: 'MenuCtrl'
        });
    }])

    .controller('MenuCtrl', ['$scope', '$location','$timeout', 'StatusType', 'PodService', 'CategoryService', 'TypeService', function ($scope, $location, $timeout, StatusType, PodService, CategoryService, TypeService) {
        $scope.cats = [];
        $scope.selected = false;
        $scope.myInterval = 0;
        $scope.menuLoading = true;

        var podType = [{
            catId: 1,
            name: 'Article',
            description: 'Articles are designed to help show the user a given feature. It\'s meant as a tutorials'
        }];

        var data = CategoryService.categories
            .filter(function (cat) {
                return cat.status == StatusType.live;
            })
            .map(function (cat) {
                return {
                    catId: cat.catId,
                    name: cat.name,
                    description: cat.description,
                    pods: PodService.pods.filter(function (pod) {
                        return pod.catId === cat.catId;
                    })
                        .map(function (pod) {
                            return pod;
                        })
                };
            });

        // Need to make the data Observable so that the menu updates when an item is selected
        data = Rx.Observable.fromArray(data);

        // Add each Category to the View and also update all pods so the selected value is false
        data.subscribe(
            // Success ForEach
            function (cat) {
                $scope.cats.push(cat);
            },
            // Error
            function(err) {
                console.log("err3042", err);
            },
            // Complete
            function() {
                // Select the first Pod within the first Category
                data.first().forEach(function (cat) {
                    Rx.Observable.fromArray(cat.pods).first().forEach(function (pod) {
                        select(pod);
                    });
                });

                init();
            }
        );

        //$scope.pods = pods;
        function navTo(location) {
            $location.url(location);
        };

        /**
         * Find the old selected item and mark as [selected=false]
         * Then mark the newly selected pod as [selected=true]
         */
        function select(pod) {
            PodService.pods
                .filter(function (pod) {
                    return pod.selected === true;
                })
                .forEach(function (pod) {
                    pod.selected = false;
                });
            pod.selected = true;
            $scope.selected = pod;
        };

        // Espose functions to view
        $scope.select = select;
        $scope.navTo = navTo;

        function init() {
            // Build Menu using Slick.js
            $timeout(function() {
                $('.podslick').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    dots: true,
                    centerMode: false
                });
                $scope.menuLoading = false;
            },500);
        };

    }]);