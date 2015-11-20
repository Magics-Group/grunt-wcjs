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
