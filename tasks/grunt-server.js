'use strict';

var supersivor = require('supervisor');

module.exports = function (grunt) {
    var server = function () {
        var doWait = grunt.option("wait");
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

        if (doWait) {
            // calling this.async without ever executing the done-function results
            // in a ever-waiting process. exactly what the developer wants, when
            // he executes 'grunt server'
            this.async();
        }
    };

    grunt.registerTask('server',
        'Start the server for testing purposes. When used directly from command-line, ' + 
        'be sure to specify the \'--wait\' option. Otherwise the process will exit immediately.',
        server);
};
