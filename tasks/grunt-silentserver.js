'use strict';

var spawn = require('child_process').spawn;

var silentserver = function () {
    var child = spawn('node', ['server/server.js']);
    child.stderr.on('data', function(data) {
        console.error('ERROR [silentserver]: '.red + data);
    });
    process.on('exit', function() {
        if (child) {
            var signals = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'];
            signals.forEach(child.kill.bind(child));
        }
    });
};

module.exports = function (grunt) {
    grunt.registerTask('silentserver',
        'Start the server without watch/supervisor in silent mode (no ' +
            'stdout, just stderr)',
        silentserver);
};
