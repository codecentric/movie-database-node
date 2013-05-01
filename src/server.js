/*jslint node:true*/

var app = require('./app'),
    http = require('http');

http.createServer(app).listen(app.get('port'), function () {
    'use strict';
    console.log('Express server listening on port ' + app.get('port'));
});
