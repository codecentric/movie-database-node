/*global
  WelcomeCtrl:false,
  NotFoundCtrl:false,
  MoviesListCtrl:false,
  MoviesAddCtrl:false,
  MovieDetailCtrl:false */

angular.module('MovieDatabase', []).config(function ($routeProvider) {
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
    .otherwise({ redirectTo: '/404' });
});
