angular.module('waxi.admin').
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/home', { templateUrl: 'App/admin/index.html', controller: 'AdminCtrl' });
    }]);