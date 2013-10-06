function TaskCtrl($scope, $http) {
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
    var tasks = jsyaml.load(response.data);
    tasks.forEach(function(task, index) {
      task.id = index+1
      task.status = getStatus(task.id);
      task.visible = false;
    })
    $scope.tasks = tasks;
  }, function(err) {
    alert('Failed to load the tasks, sorry!', JSON.stringify(err));
  });
}
