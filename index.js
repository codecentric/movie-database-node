'use strict';

angular.module('AgileJsDashboard', [])
.value('REPOS', ['agilejs/2015-06-team-1', 'agilejs/2015-06-team-2'])
.value('TRAVIS_AUTH_TOKEN', 'SECRET')

.controller('AppController', ['$scope', 'REPOS', function($scope, REPOS) {
  $scope.repos = REPOS
}]);
