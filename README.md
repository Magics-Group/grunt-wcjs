# grunt-download-wcjs
Grunt task to download & install pre-built WebChimera.js for Electron &amp; NW.JS

[![npm version](https://badge.fury.io/js/grunt-download-wcjs.svg)](http://badge.fury.io/js/grunt-download-wcjs)

## Install

```
$ npm install --save-dev grunt-download-wcjs
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	wcjs: {
        options: {
            version: 'latest',      // Webchimera version, default = latest
            dir: 'WebChimera',      // Output dir, default = WebChimera
            force: true,            // Overwrite, default = false
            runtime: {
                type: 'electron',   // nw.js / electron, default = electron
                version: 'latest',  // latest / runtime version, default = latest
                arch: 'x64',        // ia32 / x64, default = x64
                platform: 'win'     // win / osx / linux, default = win
            }
        }
    }
});

grunt.registerTask('default', ['wcjs']);
```
