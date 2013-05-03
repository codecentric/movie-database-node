/*global WelcomeCtrl:false, NotFoundCtrl:false */

angular.module('MovieDatabase', []).config(function ($routeProvider) {
    'use strict';

    $routeProvider
    .when('/', {
        controller: WelcomeCtrl,
        templateUrl: 'partial/index.html'
    })
    .when('/404', {
        controller: NotFoundCtrl,
        templateUrl: 'partial/notFound.html'
    })
    .otherwise({ redirectTo: '/404' });


});