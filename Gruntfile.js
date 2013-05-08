'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            gruntfile: 'Gruntfile.js',
            server: {
                src: 'src/**/*.js',
                test: 'test/server/**/*.js'
            },
            client: {
                js: ['public/js/**/*.js', '!public/js/lib/**/*'],
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
                reporter: 'dot'
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
                    globals: {
                        describe: false,
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
                browser: true,
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
                maxstatements: 10,
                maxlen: 120,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                sub: true,
                strict: true,
                trailing: true,
                undef: true
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
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('server',
            'Start the server for testing purposes',
            function () {
        require('./src/server');
    });

    grunt.registerTask('default', ['jshint', 'simplemocha']);
    grunt.registerTask('travis', ['jshint',
        'server',
        'simplemocha',
        'karma']);
};
