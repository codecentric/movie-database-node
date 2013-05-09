'use strict';

var http = require('http');
var app = require('./app');
var bootstrap = require('./neo4j-bootstrap');

bootstrap.initAutoIndex();
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
