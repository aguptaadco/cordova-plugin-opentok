#!/usr/bin/env node

module.exports = function (context) {

    var downloadFile = require('./downloadFile.js'),
        exec = require('./exec/exec.js'),
        Q = context.requireCordovaModule('q'),
        deferral = new Q.defer();
    console.log('Downloading OpenTok iOS SDK');
    downloadFile('https://www.adcochina.com/OpenTok',
        './OpenTok', function (err) {
            if (!err) {
                console.log('downloaded');

                    var frameworkDir = context.opts.plugin.dir + '/src/ios/OpenTok.framework/';
                    exec('mv ./OpenTok ' + frameworkDir, function (err, out, code) {
                        console.log('moved OpenTok.framework into ' + frameworkDir);


                            exec('rm ./OpenTok', function (err, out, code) {
                                console.log('Removed downloaded SDK');
                                deferral.resolve();
                            });

                    });

            }
        });
    return deferral.promise;
};