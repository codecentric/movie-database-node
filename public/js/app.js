/*global WelcomeCtrl:false, NotFoundCtrl:false, MoviesCtrl:false */

angular.module('MovieDatabase', []).config(function ($routeProvider) {
    'use strict';

    $routeProvider
    .when('/', {
        controller: WelcomeCtrl,
        templateUrl: 'partial/index.html'
    })
    .when('/movies', {
        controller: MoviesCtrl,
        resolve: MoviesCtrl.resolve,
        templateUrl: 'partial/movies.html'
    })
    .when('/404', {
        controller: NotFoundCtrl,
        templateUrl: 'partial/notFound.html'
    })
    .otherwise({ redirectTo: '/404' });

});
