'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            gruntfile: 'Gruntfile.js',
            server: {
                src: 'src/**/*.js',
                test: 'test/**/*.js'
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
            src: '<%= meta.server.src %>',
            test: {
                files: '<%= meta.server.test %>',
                options: {
                    globals: {
                        describe: false,
                        it: false
                    }
                }
            },
            gruntfile: '<%= meta.gruntfile %>',
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
                undef: true,
                unused: true,
                node: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'simplemocha']);
    grunt.registerTask('travis', ['jshint', 'simplemocha']);
};
