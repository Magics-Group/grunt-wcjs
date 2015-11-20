var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var needle = require('needle');
var mkdirp = require('mkdirp');
var async = require('async');

var utils = require('./lib/utils');
var downloader = require('./lib/downloader');


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

function getVLC(data) {
    return new Promise(function(resolve, reject) {

        utils.getJson('https://api.github.com/repos/Ivshti/vlc-prebuilt/releases/latest')
            .then(function(json) {

                var asset = false;

                json.assets.forEach(function(entry) {
                    var targetOS = parsePath(parsePath(entry.name).name).name.split('-');

                    if (/^win/.test(targetOS[2]))
                        var platform = 'win';
                    else
                        var platform = targetOS[2]

                    if (platform === data.platform)
                        asset = {
                            url: entry.browser_download_url,
                            version: targetOS[1],
                            platform: targetOS[2]
                        }
                });
                if (!asset)
                    return reject('No VLC libs found for this system');

                console.log('Retriving VLC Libs:', asset.version, asset.platform);
                downloader.downloadAndUnpack(data.targetDir, asset.url)
                    .then(resolve)

            })
            .catch(reject)
    });
}





module.exports = function(grunt) {

    grunt.registerTask('wcjs', 'Download pre-built WebChimera.js with bundled VLC Libs', downloadTask);

    function downloadTask() {
        var done = this.async();
        var params = this.options({
            version: 'latest',
            dir: 'WebChimera',
            force: true,
            runtime: {
                type: 'electron',
                version: 'latest',
                arch: 'x64',
                platform: 'win'
            }
        });

        async.waterfall([
            getWCJS.bind(null, params.runtime, params.version, params.dir)
        ], done);

    }
};