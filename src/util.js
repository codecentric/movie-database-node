var Q = require('q');
var https = require('https');
var parseUrl = require('url').parse;
var childProcess = require('child_process');

module.exports.request = function request(params) {
    var options = parseUrl(params.url);
    options.method = params.method || 'GET';
    if (params.user && params.password) {
      options.auth = params.user + ":" + params.password;
    }

    var deferred = Q.defer();

    var request = https.request(options, function(response) {
        var statusCode = response.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
            deferred.resolve(response);
        } else {
            deferred.reject(new Error('Status code was: ' + statusCode));
        }
    });

    request.on('error', function(error) {
        deferred.reject(new Error('Request failed: ' + error));
    });

    if (params.data) {
      request.write(params.data, 'utf8');
    }

    request.end();

    return deferred.promise;
};

module.exports.readBody = function readBody(response) {
  var deferred = Q.defer();

  var data = [];
  response.setEncoding('utf8');
  response.on('data', function(chunk) {
      data.push(chunk);
  });
  response.on('end', function() {
      deferred.resolve(data.join());
  });
  response.on('error', function() {
      deferred.reject(new Error('Failed reading response body: ' + error));
  });

  return deferred.promise;
};

module.exports.exec = function exec(cmd, env) {
  console.log('Executing command: %s', cmd);
  var deferred = Q.defer();

  childProcess.exec(cmd, {env: env}, function(error) {
    if (error) {
      deferred.reject(new Error(error));
    } else {
      deferred.resolve();
    }
  })

  return deferred.promise;
};
