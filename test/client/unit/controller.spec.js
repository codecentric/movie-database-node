/* jshint -W106 */
var expect = chai.expect;

describe('controller', function () {
    'use strict';

    beforeEach(module('MovieDatabase'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('AppController', function () {

        it('should set a title', function () {
            var $scope = {};
            var controller = $controller('AppController', { $scope: $scope });
            expect($scope.title).to.equal('The Movie Database');
        });
    });

    describe('MoviesListController', function () {
        it('should set list of movies on scope', function () {
            var $scope = {};
            var $location = {};
            var moviesResponse = {
                data: 42
            };

            var controller = $controller('MoviesListController', {
                $scope: $scope,
                $location: $location,
                movieList: moviesResponse,
            });

            expect($scope.movies).to.deep.equal(moviesResponse.data);
            expect($scope.add).to.be.a('function');
        });

        it('should redirect to the add movie page', function () {
            var $scope = {};
            var $location = {};
            var moviesResponse = {
                data: 42
            };
            var redirected = false;
            $location.path = function () {
                redirected = true;
            };

            var controller = $controller('MoviesListController', {
                $scope: $scope,
                $location: $location,
                movieList: moviesResponse,
            });

            $scope.add();

            expect(redirected).to.be.ok;
        });
    });
});
