var _ = require('lodash');
var path = require('path');
var Promise = require('bluebird');
var mkdirp = require('mkdirp');

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

module.exports = function(grunt) {

    grunt.registerTask('wcjs', 'Download pre-built WebChimera.js', downloadTask);

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
        getWCJS(params.runtime, params.version, params.dir, done);
    }
};