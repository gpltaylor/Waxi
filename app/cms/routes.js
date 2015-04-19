'use strict';

// Declare app level module which depends on filters, and services
angular.module('waxi').
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cms/home', { templateUrl: 'App/cms/index.html', controller: 'CmsCtrl' });
    }]);