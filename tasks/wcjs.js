var _ = require('lodash');
var path = require('path');
var Promise = require('bluebird');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');


var utils = require('./lib/utils');
var downloader = require('./lib/downloader');

function getPlatformInfo() {
    if (/linux/.test(process.platform)) {
        return process.arch == 32 ? 'linux:ia32' : 'linux:x64';
    } else if (/darwin/.test(process.platform)) {
        return 'osx:ia32';
    } else {
        return 'win:ia32';
    }
}

function getWCJS(runtime, version, dir, callback) {
    utils.getJson(('https://api.github.com/repos/RSATom/WebChimera.js/releases/' + ((version === 'latest') ? 'latest' : 'tags/' + version)))
        .then(function(json) {
            if (json.message === 'Not Found') {
                console.log('No WebChimera Download Found');
                return callback();
            }
            var candidate = false;

            _.forEach(json.assets, function(asset) {
                var assetParsed = path.parse(asset.name).name.split('_');

                var assetRuntime = {
                    type: assetParsed[1],
                    version: (version === 'latest') ? 'latest' : assetParsed[2],
                    arch: assetParsed[3],
                    platform: assetParsed[4]
                };
                if (_.isEqual(runtime, assetRuntime))
                    candidate = asset;
            });

            if (!candidate) {
                console.log('No WebChimera Download Found');
                return callback();
            }

            console.log('Acquiring: ', candidate.name);

            downloader.downloadAndUnpack(dir, candidate.browser_download_url).then(function() {
                return callback();
            });
        })
        .catch(function(e) {
            console.log('Error:', e);
            return callback()
        })
}

module.exports = function(grunt) {

    grunt.registerTask('wcjs', 'Download pre-built WebChimera.js', downloadTask);

    function downloadTask() {
        var done = this.async();
        var params = this.options({
            version: 'latest',
            dir: 'WebChimera',
            force: false,
            runtime: {
                type: 'electron',
                version: 'latest',
                arch: getPlatformInfo().split(':')[1],
                platform: getPlatformInfo().split(':')[0]
            }
        });

        if (params.force)
            rimraf(params.dir, function() {
                getWCJS(params.runtime, params.version, params.dir, done);
            });
        else {
            getWCJS(params.runtime, params.version, params.dir, done);
        }

    }
};