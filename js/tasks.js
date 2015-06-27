var module = angular.module('tasks', ['ngSanitize']);

module.controller('TaskCtrl', function TaskCtrl($scope, $http) {
  $scope.tasks = null;

  function getTaskStorageId(id) {
    return 'taskStatus-' + id;
  }

  function getStatus(id) {
    return localStorage.getItem(getTaskStorageId(id)) || 'notStarted';
  }

  function saveStatus(task) {
    localStorage.setItem(getTaskStorageId(task.id), task.status);
  }

  $scope.toggle = function(task) {
    task.visible = !task.visible;
  };

  $scope.start = function(task) {
    task.status = 'inProgress';
    saveStatus(task);
  };

  $scope.finish = function(task) {
    task.status = 'done';
    saveStatus(task);
  };

  $scope.reopen = function(task) {
    task.status = 'notStarted';
    saveStatus(task);
  }

  $http.get('./tasks.yml')
  .then(function(response) {
    var tracks = [];
    var trackWrappers = jsyaml.load(response.data);
    var trackIndex = 0;
    trackWrappers.forEach(function(trackWrapper) {
      // a track wrapper is an object with only one attribute, the key is the
      // name of the track, the value is the array of tasks.
      Object.keys(trackWrapper).forEach(function(trackName) {
        var tasks = trackWrapper[trackName];
        tasks.forEach(function(task, index) {
          task.id = trackName + '_' + (index);
          task.status = getStatus(task.id);
          task.visible = false;
        });
        tracks.push({
          name: trackName,
          tasks: tasks,
        });
      });
    });
    $scope.tracks = tracks;
  }, function(err) {
    alert('Failed to load the tasks, sorry!', JSON.stringify(err));
  });
});
