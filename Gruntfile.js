module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({

        wcjs: {
            options: {
                npmInstall: true, //Add WebChimera in node_modules 
                version: 'latest', // WebChimera Version 
                dir: 'WebChimera', // Cannot be used with npmInstall parm set to true; output dir for WebChimera
                force: true, //Overwrite any pre-exsisting WebChimera
                runtime: {
                    version: 'latest',
                    arch: 'x64',
                    platform: 'win32'
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['wcjs']);
};