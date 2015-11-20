# grunt-wcjs
Grunt task to download & install pre-built WebChimera.js for Electron &amp; NW.JS


## Install

```
$ npm install --save-dev grunt-wcjs
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

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

grunt.registerTask('default', ['wcjs']);
```
