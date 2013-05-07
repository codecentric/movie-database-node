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
                js: ['public/js/**/*.js', '!public/js/lib/**/*']
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
                maxparams: 3,
                maxstatements: 10,
                maxlen: 80,
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
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'simplemocha']);
    grunt.registerTask('travis', ['jshint', 'simplemocha']);
};
