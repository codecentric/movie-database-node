'use strict';

var runner = require('karma').runner;
var server = require('karma').server;
var path = require('path');
require('colors');

module.exports = function (grunt) {
    var _ = grunt.util._;
    grunt.registerMultiTask('karma', 'Run browser unit- and integration-tests with karma.', function() {
        var options = this.options({
            background: false
        });

        var data = this.data;

        // merge options onto data, with data taking precedence
        data = _.merge(options, data);

        // the --debug options disables singleRun and forces the Chrome browser
        if (grunt.option("debug")) {
            data.singleRun = false;
            data.browsers = ["Chrome"];
        }

        data.configFile = path.resolve(data.configFile);
        if (data.configFile) {
            data.configFile = grunt.template.process(data.configFile);
        }
        
        var done = this.async();
        server.start(data, function(status) {
            // unfortunately, the return-code (or status) of karma-server means
            // means sth different than the status expected by grunt
            done(!status)
        });
    });
};
