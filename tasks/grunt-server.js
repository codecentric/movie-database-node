'use strict';

var supersivor = require('supervisor');

var server = function () {
    supersivor.run(['--ignore',
            'coverage/,test-results.xml',
            'server/server.js']);

    process.on('exit', function() {
        var child = supersivor.child;
        if (child) {
            var signals = ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'];
            signals.forEach(child.kill.bind(child));
        }
    });
};

module.exports = function (grunt) {
    grunt.registerTask('server',
        'Start the server for testing purposes',
        server);
};
