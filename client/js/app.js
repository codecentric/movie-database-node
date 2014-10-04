/*global
  WelcomeCtrl:false,
  NotFoundCtrl:false,
  MoviesListCtrl:false,
  MoviesAddCtrl:false,
  MovieDetailCtrl:false,
  MovieEditCtrl:false,
  ErrorCtrl:false */

angular.module('MovieDatabase', ['ngRoute']).config(
        function ($routeProvider, $locationProvider, $httpProvider) {
    'use strict';

    $routeProvider
    .when('/', {
        controller: WelcomeCtrl,
        templateUrl: '/partial/index.html'
    })
    .when('/movies', {
        controller: MoviesListCtrl,
        resolve: MoviesListCtrl.resolve,
        templateUrl: '/partial/movies/list.html'
    })
    .when('/movies/new', {
        controller: MoviesAddCtrl,
        templateUrl: '/partial/movies/add.html'
    })
    .when('/movies/:id', {
        controller: MovieDetailCtrl,
        resolve: MovieDetailCtrl.resolve,
        templateUrl: '/partial/movies/detail.html'
    })
    .when('/movies/:id/edit', {
        controller: MovieEditCtrl,
        resolve: MovieEditCtrl.resolve,
        templateUrl: '/partial/movies/edit.html'
    })
    .when('/404', {
        controller: NotFoundCtrl,
        templateUrl: '/partial/notFound.html'
    })
    .when('/error', {
        controller: ErrorCtrl,
        templateUrl: '/partial/error.html'
    })
    .otherwise({
        redirectTo: function () {
            return '/404?culprit=client';
        }
    });

    // use the new History API (Angular provides automatic fallback)
    $locationProvider.html5Mode(true);

    // We explicitly have to set the HashPrefix to comply with Google's
    // crawlable hash prefix.
    $locationProvider.hashPrefix('!');

    $httpProvider.responseInterceptors.push(function ($q, $location) {
        return function (promise) {
            return promise.then(function () {
                // no success handler
                return promise;
            }, function (response) {
                var status = response.status;
                if (status === 404) {
                    $location.path('/404');
                    $location.search('culprit', 'server');
                } else if (status >= 500) {
                    $location.path('/error');
                    $location.search('culprit', 'server');
                }

                return $q.reject(response);
            });
        };
    });
});
