'use strict';

angular.module('AgileJsDashboard').
filter('ago', function() {
  return function(dateString) {
    var duration = Date.now() - new Date(dateString).getTime();
    if (duration < 60*1000) {
      return '' + Math.round(duration / 1000) + 's';
    } else if (duration < 60*60*1000) {
      return '' + Math.round(duration / 60 /1000) + 'm';
    }

    return '' + Math.round(duration / 60 / 60 / 1000) + 'h ' +
      Math.round((duration % (60*60*1000)) / 60 /1000) + 'm';
  };
});
