'use strict';

angular.module('AgileJsDashboard').
directive('travisDashboard', function() {
  return {
    scope: {
      slug: '=repo'
    },
    templateUrl: 'travis-dashboard/travis-dashboard.html',
    controllerAs: 'self',
    controller: ['$scope', '$timeout', 'TravisApi', function TravisDashboard($scope, $timeout, TravisApi) {
      var self = this;
      self.repo = undefined;
      self.errorMessage = undefined;
      self.slug = $scope.slug;
      self.buildCount = 0;
      self.failCount = 0;
      self.successCount = 0;

      var delay = 10000;

      refresh();

      function refresh() {
        TravisApi.getRepo($scope.slug).
          then(function(repo) {
            self.repo = repo;

            if (repo) {
              return TravisApi.getBuildsForRepo(repo.slug);
            } else {
              return [];
            }
          })
          .then(function(repoBuilds) {
            updateCounts(repoBuilds);
            self.builds = repoBuilds.slice(0,5);
          })
          .catch(function(response) {
            self.errorMessage = 'Error connecting to Travis: ' + response.data;
          })
          .finally(function() {
            $timeout(refresh, delay);
          })
      }

      function updateCounts(builds) {
        self.failCount = builds.filter(function(build) {
          return build.state == 'failed' || build.state == 'errored';
        }).length

        self.successCount = builds.filter(function(build) {
          return build.state == 'passed';
        }).length

        self.buildCount = builds.length

      }
    }]
  };
});
