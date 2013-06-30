'use strict';

var http = require('http');
var app = require('./app');
var neo4j = require('./neo4j-bootstrap');
var config = require('./config');

neo4j.configureAutoIndex();

http.createServer(app).listen(config.application.port, function () {
    console.log('Express server listening on port ' + app.get('port'));
});
