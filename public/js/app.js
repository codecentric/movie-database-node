/*global
  WelcomeCtrl:false,
  NotFoundCtrl:false,
  MoviesListCtrl:false,
  MoviesAddCtrl:false,
  MovieDetailCtrl:false,
  ErrorCtrl:false */

angular.module('MovieDatabase', []).config(
        function ($routeProvider, $httpProvider) {
    'use strict';

    $routeProvider
    .when('/', {
        controller: WelcomeCtrl,
        templateUrl: 'partial/index.html'
    })
    .when('/movies', {
        controller: MoviesListCtrl,
        resolve: MoviesListCtrl.resolve,
        templateUrl: 'partial/movies/list.html'
    })
    .when('/movies/new', {
        controller: MoviesAddCtrl,
        templateUrl: 'partial/movies/add.html'
    })
    .when('/movies/:id', {
        controller: MovieDetailCtrl,
        resolve: MovieDetailCtrl.resolve,
        templateUrl: 'partial/movies/detail.html'
    })
    .when('/404', {
        controller: NotFoundCtrl,
        templateUrl: 'partial/notFound.html'
    })
    .when('/error', {
        controller: ErrorCtrl,
        templateUrl: 'partial/error.html'
    })
    .otherwise({ redirectTo: '/404' });


    $httpProvider.responseInterceptors.push(function ($q, $location) {
        return function (promise) {
            return promise.then(function () {
                // no success handler
                return promise;
            }, function (response) {
                var status = response.status;
                if (status === 404) {
                    $location.path('/404');
                } else if (status >= 500) {
                    $location.path('/error');
                }

                return $q.reject(response);
            });
        };
    });
});
