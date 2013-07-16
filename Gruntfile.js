'use strict';

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

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadTasks('./tasks');

    grunt.registerTask('default', ['jshint', 'simplemocha']);
    grunt.registerTask('travis', [
        'jshint',
        'simplemocha',
        'karma:unit',
        'silentserver',
        'karma:integration'
    ]);
    grunt.registerTask('dev', ['server', 'watch']);
};
