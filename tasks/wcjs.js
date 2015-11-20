var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var needle = require('needle');
var mkdirp = require('mkdirp');



/*

function getWCJS(data) {
    return new Promise(function(resolve, reject) {
        var availableVersions = [];
        var url = 'https://api.github.com/repos/RSATom/WebChimera.js/releases/' + ((data.version === 'latest') ? 'latest' : 'tags/' + data.version)

        console.log(url);

        getJson(url)
            .then(function(json) {

                if (json.message && json.message === 'Not Found')
                    return reject('Version Not Found')

                var downloadName = json.name;
                /*
                _.remove(json.assets, function(asset) {
                    asset = parsePath(asset.name).name.split('_');
                    if (asset[1] === 'nw')
                        asset[1] = 'nw.js'
                    return (asset[1] === data.runtime && asset[3] === data.arch && asset[4] === data.platform); //remove all that are not for our runtime/arch/os.
                }).forEach(function(entry) {
                    availableVersions.push({
                        version: parsePath(entry.name).name.split('_')[2],
                        url: entry.browser_download_url,
                        name: parsePath(entry.name).name
                    })
                });
                if (data.runtimeVersion === 'latest') {
                    var downloadObject = _.last(availableVersions);
                } else {
                    var downloadObject = _(availableVersions)
                        .find(function(version) {
                            return version.version === data.runtimeVersion;
                        });
                }
                if (!downloadObject)
                    return reject('No download candidate availale')
                console.log('Acquiring: ', downloadObject.name);
                downloader.downloadAndUnpack(data.targetDir, downloadObject.url)
                    .then(function() {
                        resolve(data);
                    });
                    */
/*
            })
            .catch(reject)

    });
}

function getVLC(data) {
    return new Promise(function(resolve, reject) {

        getJson('https://api.github.com/repos/Ivshti/vlc-prebuilt/releases/latest')
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
*/
module.exports = function(grunt) {

    grunt.registerTask('wcjs', 'Download pre-built WebChimera.js with bundled VLC Libs', downloadTask);

    function downloadTask() {
        var params = this.options();

        console.log(params);


    }

};