'use strict';

// Only used by grunt-task karma:integration to start separate process with karma-server

var server = require('karma').server;
var data = JSON.parse(process.argv[2]);
server.start(data);
