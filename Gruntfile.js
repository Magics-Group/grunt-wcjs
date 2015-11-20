module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({

        wcjs: {
            options: {
                version: 'latest',
                dir: 'WebChimera',
                force: true,
                runtime: {
                    type: 'electron',
                    version: 'latest',
                    arch: 'x64',
                    platform: 'osx'
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['wcjs']);
};