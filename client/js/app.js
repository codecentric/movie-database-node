angular
.module('MovieDatabase', ['ngRoute'])
.config(function ($routeProvider, $locationProvider, $httpProvider, $provide) {
    'use strict';

    $routeProvider
    .when('/', {
        controller: 'WelcomeController',
        templateUrl: '/partial/index.html'
    })
    .when('/movies', {
        controller: 'MoviesListController',
        resolve: {
            movieList: function(MovieService) {
                return MovieService.loadList();
            },
        },
        templateUrl: '/partial/movies/list.html'
    })
    .when('/movies/new', {
        controller: 'MoviesAddController',
        templateUrl: '/partial/movies/add.html'
    })
    .when('/movies/:id', {
        controller: 'MovieDetailController',
        resolve: {
            movie: function(MovieService, $route) {
                var movieId = $route.current.params.id;
                return MovieService.load(movieId);
            },
        },
        templateUrl: '/partial/movies/detail.html'
    })
    .when('/movies/:id/edit', {
        controller: 'MovieEditController',
        resolve: {
            movie: function(MovieService, $route) {
                var movieId = $route.current.params.id;
                return MovieService.load(movieId);
            },
        },
        templateUrl: '/partial/movies/edit.html'
    })
    .when('/404', {
        controller: 'NotFoundController',
        templateUrl: '/partial/notFound.html'
    })
    .when('/error', {
        controller: 'ErrorController',
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

    $provide.factory('errorInterceptor', function($q, $location) {
        return {
            responseError: function(response) {
                var status = response.status;
                if (status === 404) {
                    $location.path('/404');
                    $location.search('culprit', 'server');
                } else if (status >= 500) {
                    $location.path('/error');
                    $location.search('culprit', 'server');
                }
                return $q.reject(response);
            }
        };
    });

    $httpProvider.interceptors.push('errorInterceptor');
});
