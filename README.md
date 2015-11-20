# grunt-wcjs
Grunt task to download & install pre-built WebChimera.js with bundled VLC Libs for Electron &amp; NW.JS


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
			npmInstall: true, //Add WebChimera in node_modules 
			version: 'latest', 	// WebChimera Version 
			dir: 'WebChimera', // Cannot be used with npmInstall parm set to true; output dir for WebChimera
			force: true, 		//Overwrite any pre-exsisting WebChimera
			runtime: {
				version: 'latest',	
				arch: 'x64',
				platform: 'win32'
			}
		}
	}
});

grunt.registerTask('default', ['wcjs']);
```
