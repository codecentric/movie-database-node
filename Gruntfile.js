'use strict';
var path = require('path');
var supersivor = require('supervisor');
var spawn = require('child_process').spawn;
require('colors');

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            all: ['client/**/*', 'server/**/*', 'test/**/*'],
            gruntfile: 'Gruntfile.js',
            server: {
                src: 'server/**/*.js',
                test: 'test/server/**/*.js'
            },
            client: {
                js: ['client/js/**/*.js', '!client/js/lib/**/*'],
                tests: {
                    integration: {
                        config: 'test/karma/integration.conf.js',
                        src: 'test/karma/integration/**/*.js'
                    },
                    unit: {
                        config: 'test/karma/unit.conf.js',
                        src: 'test/karma/unit/**/*.js'
                    }
                }
            }
        },
        simplemocha: {
            options: {
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: '<%= meta.server.test %>'
            }
        },
        jshint: {
            src: {
                files: { src: '<%= meta.server.src %>' },
                options: {
                    node: true,
                    globalstrict: true
                }
            },
            test: {
                files: { src: '<%= meta.server.test %>' },
                options: {
                    node: true,
                    globalstrict: true,
                    expr: true, // to allow the use of expet(val).to.be.empty
                    globals: {
                        describe: false,
                        beforeEach: false,
                        it: false
                    }
                }
            },
            gruntfile: {
                files: { src: '<%= meta.gruntfile %>' },
                options: {
                    node: true,
                    globalstrict: true
                }
            },
            client: {
                files: { src: '<%= meta.client.js %>' },
                options: {
                    browser: true,
                    unused: false,
                    globals: {
                        angular: false
                    }
                }
            },
            karmaIntegration: {
                files: { src: '<%= meta.client.tests.integration.src %>' },
                options: {
                    globals: {
                        browser: false,
                        expect: false,
                        element: false,
                        describe: false,
                        it: false,
                        beforeEach: false,
                        input: false,
                        repeater: false
                    }
                }
            },
            karmaUnit: {
                files: { src: '<%= meta.client.tests.unit.src %>' },
                options: {
                    newcap: false,
                    undef: false,
                    immed: false,
                    unused: false,
                    sub: false,
                    noempty: false,
                    expr: true,
                    globals: {
                        describe: false,
                        it: false,
                        chai: false
                    }
                }
            },
            options: {
                bitwise: true,
                boss: true,
                curly: true,
                camelcase: true,
                eqeqeq: true,
                eqnull: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                maxcomplexity: 4,
                maxdepth: 3,
                maxparams: 4,
                maxstatements: 14,
                maxlen: 120,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                sub: true,
                strict: true,
                trailing: true,
                undef: true,
                unused: true
            }
        },
        karma: {
            unit: {
                configFile: '<%= meta.client.tests.unit.config %>',
                browsers: ['PhantomJS'],
                singleRun: true
            },
            integration: {
                configFile: '<%= meta.client.tests.integration.config %>',
                browsers: ['PhantomJS'],
                singleRun: true
            }
        },
        watch: {
            files: '<%= meta.all %>',
            tasks: ['jshint', 'simplemocha', 'karma']
        }
    });

    var runner = require('karma').runner;
    var server = require('karma').server;
    var _ = grunt.util._;
    grunt.registerMultiTask('karma', 'run karma.', function() {
        var done = this.async();
        var options = this.options({
            background: false
        });
        var data = this.data;
        //merge options onto data, with data taking precedence
        data = _.merge(options, data);
        data.configFile = path.resolve(data.configFile);

        if (data.configFile) {
            data.configFile = grunt.template.process(data.configFile);
        }
        //support `karma run`, useful for grunt watch
        if (this.flags.run){
            runner.run(data, done);
            return;
        }
        //allow karma to be run in the background so it doesn't block grunt
        if (this.data.background){
            grunt.util.spawn({
                cmd: 'node',
                args: [path.join(__dirname, 'karma-server.js'), JSON.stringify(data)]
            },function(){});
            done();
        }
        else {
            server.start(
                data,
                function(code) {
                    done(code);
                });
        }
    });


    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('server',
            'Start the server for testing purposes',
            function () {
        supersivor.run(['--ignore',
                'coverage/,test-results.xml',
                'server/server.js']);

        process.on('exit', function() {
            var child = supersivor.child;
            if (child) {
                ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'].forEach(
                        function(signal) {
                    child.kill(signal);
                });
            }
        });
    });

    grunt.registerTask(
        'silentserver',
        'Start the server without watch/supervisor in silent mode (no stdout, just stderr)',
        function () {
            var child = spawn(
                'node',
                ['server/server.js']);
            child.stderr.on('data', function(data) {
                console.error('ERROR [silentserver]: '.red + data);
            });
            process.on('exit', function() {
                if (child) {
                    ['SIGTERM', 'SIGINT', 'SIGHUP', 'SIGQUIT'].forEach(
                        function(signal) {
                            child.kill(signal);
                        });
                }
            });
        });

    grunt.registerTask('default', ['jshint', 'simplemocha']);
    grunt.registerTask(
        'travis',
        ['jshint', 'simplemocha', 'karma:unit', 'silentserver', 'karma:integration']);
    grunt.registerTask('dev', ['server', 'watch']);
};
