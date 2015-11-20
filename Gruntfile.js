module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        wcjs: {
            options: {
                version: 'latest',      // Webchimera version
                dir: 'WebChimera',      // Output dir
                force: true,            // Overwrite 
                runtime: {
                    type: 'electron',   // nw.js / electron
                    version: 'latest',  // latest / runtime version
                    arch: 'x64',        // ia32 / x64 
                    platform: 'win'     // win / osx / linux
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['wcjs']);
};