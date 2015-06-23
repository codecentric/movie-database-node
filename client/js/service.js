(function() {
    'use strict';

    var app = angular.module('MovieDatabase');

    app.service('MovieService', function($http) {
        this.loadList = function() {
            return $http.get('/movies');
        };

        this.load = function(id) {
            return $http.get('/movies/' + id);
        };
    });
})();
