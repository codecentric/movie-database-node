'use strict';

angular.module('AgileJsDashboard').
service('TravisApi', ['$http', '$q', 'TRAVIS_AUTH_TOKEN', function TravisApi($http, $q, TRAVIS_AUTH_TOKEN) {
  var API_V2_MIMETYPE = 'application/json; version=2';

  this.getRepo = function(repo) {
    //return qVal({"id":"test","slug":"test"});
    return $http.get('https://api.travis-ci.org/repos/'+repo,
        {headers: {'Authorization': 'token ' + TRAVIS_AUTH_TOKEN, 'Accept': API_V2_MIMETYPE}}).
        then(function(response) {
          return response.data.repo;
        });
  }

  this.getBuildsForRepo = function(repo) {
    //return qVal([{},{}]);
    return $http.get('https://api.travis-ci.org/repos/' + repo + '/builds',
        {headers: {'Authorization': 'token ' + TRAVIS_AUTH_TOKEN, 'Accept': API_V2_MIMETYPE}}).
        then(function(response) {

          var commits = {};
          response.data.commits.forEach(function(commit) {
            commits[commit.id] = commit;
          });

          var builds = response.data.builds;
          builds.forEach(function(build) {
            build.commit = commits[build.commit_id];
          })

          return builds;
        });
  };

  function qVal(val) {
    return $q(function(resolve) {resolve(val);});
  }
}]);
