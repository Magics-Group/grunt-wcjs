var Promise = require('bluebird');
var needle = require('needle');


module.exports = {
    getJson: function(url) {
        return new Promise(function(resolve, reject) {
            needle.get(url, {
                json: true
            }, function(err, resp) {
                if (err || !resp.body)
                    return reject('something went Very Wong:' + (err || "no body!?!?!"));
                resolve(resp.body)
            });
        });
    }
};