'use strict';

angular.module('AgileJsDashboard').
directive('travisMultiDashboard', function() {
  return {
    scope: {
      repos: '=repos'
    },
    templateUrl: 'travis-multi-dashboard/travis-multi-dashboard.html',
    controller: ['$scope', function($scope) {
      $scope.repoChunks = chunk($scope.repos, 3);

      function chunk(input, size) {
        var output = [];
        for (var i=0; i<input.length; i+=size) {
          output.push(input.slice(i, i+size));
        }
        return output;
      }
    }]
  };
});
