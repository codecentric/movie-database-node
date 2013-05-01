/*global module:false,require:false*/
module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: "<json:package.json>",
        meta: {
            banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
                "<%= grunt.template.today('yyyy-mm-dd') %>\n" +
                "<%= pkg.homepage ? '* ' + pkg.homepage + '\n' : '' %>" +
                "* Copyright (c) <%= grunt.template.today('yyyy') %> " +
                " <%= pkg.author.name %>;" +
                " Licensed <%= _.pluck(pkg.licenses, 'type').join('') %> */"
        },
        simplemocha: {
            options: {
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'dot'
            },
            all: { src: ['test/**/*.js'] }
        },
        jslint: {
            files: [
                //'Gruntfile.js', 
                'src/**/*.js',
                'test/**/*.js'
            ],
        },
        jshint: {
            all: [
                //'Gruntfile.js', 
                'src/**/*.js', 
                'test/**/*.js'],
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
                indent: 2,
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
                quotmark: "double",
                sub: true,
                strict: true,
                trailing: true,
                undef: true,
                unused: true
            },
            globals: {
                require: false,
                define: false
            }
        },
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('travis', ["jslint", "simplemocha"]);

};
