var settings = require('./settings');
var newRepositories = require('./repos');
var util = require('./util');
var Q = require('q');
var os = require('os');
var format = require('util').format;
var path = require('path');

var baseUrl = 'https://api.github.com';
var origin = 'https://github.com/codecentric/movie-database-node.git';
var tmppath = path.join(os.tmpdir(), 'agilejs');

var log = console.log.bind(console);

function request(method, url, data) {
  return util.request({
    url: url,
    method: method,
    user: settings.user,
    password: settings.password,
    data: JSON.stringify(data)
  });
}

var get = request.bind(null, 'GET');
var post = request.bind(null, 'POST');
var put = request.bind(null, 'PUT');
var del = request.bind(null, 'DELETE');

function tap(prefix) {
  return function(val) {
    log('%s:', prefix, val);
    return val;
  }
}

function getAllExistingReposities() {
  return get(format('%s/users/%s/repos', baseUrl, settings.user))
  .then(util.readBody)
  .then(util.parseJson)
  .then(function(repos) {
    return repos.map(function(repo) {
      return repo.name;
    });
  })
  .then(tap('Existing repositories'));
}

function assertNoDuplicatedRepository(existingRepositories) {
  var duplicates = newRepositories.filter(function(newRepository) {
    return existingRepositories.indexOf(newRepository.name) !== -1;
  });

  if (duplicates.length > 0) {
    var names = duplicates.map(function(repo) {
      return repo.name;
    });
    throw new Error('Found duplicate repositories: ' + names.join(', '));
  }
}

function assertCollaboratorsExist() {
  var users = newRepositories.reduce(function(collaborators, repository) {
    return collaborators.concat(repository.collaborators);
  }, []);

  log('Checking collaborators for existence:', users);

  var promises = users.map(function(user) {
    return get(format('%s/users/%s', baseUrl, user));
  });

  return Q.all(promises)
  .fail(tap('Some users are not existing!'));
}

function addCollaborators(repo) {
  log('Adding collaborators to %s', repo.name);

  return Q.all(repo.collaborators.map(function(collaborator) {
    return put(format('%s/repos/%s/%s/collaborators/%s',
      baseUrl,
      settings.user,
      repo.name,
      collaborator));
  }));
}

function createRepository(repo) {
  log('Creating repository for team %s', repo.name);
  return post(format('%s/user/repos', baseUrl), {
    'name': repo.name,
    'description': "an AgileJS workshop team",
    'has_issues': false,
    'has_wiki': false,
    'has_downloads': false,
    'auto_init': false
  })
  .then(addCollaborators.bind(null, repo));
}

function createRepositories() {
  return Q.all(newRepositories.map(createRepository));
}

function pushTo(repo) {
  var endpoint = format('https://%s:%s@github.com/%s/%s.git',
    settings.user,
    encodeURIComponent(settings.password),
    settings.user,
    repo.name);
  log('Addting remote %s', endpoint);
  return util.exec(format('git remote add %s %s', repo.name, endpoint),
      {'GIT_DIR': format('%s/.git', tmppath)})
  .then(function() {
    log('Pushing to remote %s', endpoint);
    return util.exec(format('git push %s master',repo.name),
        {'GIT_DIR': format('%s/.git', tmppath)});
  });
}

function doInitialCommits() {
  log('Cloning %s into %s', origin, tmppath);
  return util.exec(format('git clone %s %s', origin, tmppath))
  .then(function() {
    log('Finished cloning. Progressing to update of each repository');
    var promise = Q(null);

    newRepositories.forEach(function(repo) {
      promise = promise.then(function() {
        return pushTo(repo);
      });
    })

    return promise;
  });
}

// getAllExistingReposities()
// .then(assertNoDuplicatedRepository)
// .then(assertCollaboratorsExist)
// .then(createRepositories)
// .then(doInitialCommits)
// .done();

doInitialCommits();
