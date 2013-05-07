'use strict';

var app = require('./app'),
    http = require('http'),
    request = require('superagent');

// Enable auto-indexing, primarily needed for heroku,
// where we dont have access to neo4j.properties.
// See http://docs.neo4j.org/chunked/milestone/rest-api-configurable-auto-indexes.html
var neo4jBaseUrl = process.env.NEO4J_URL || 'http://localhost:7474';
request.post(neo4jBaseUrl + '/db/data/index/node')
    .type('application/json')
    .send({
        'name' : 'node_auto_index',
        'config' : {
            'type' : 'fulltext',
            'provider' : 'lucene'
        }
    }).end(function (err, res) {
        if (err) {
            console.error(err);
        } else if (res.status !== 201) {
            console.error(res.body);
        } else {
            console.log('Added index "node_auto_index"');
        }
    });

request.put(neo4jBaseUrl + '/db/data/index/auto/node/status')
    .type('application/json')
    .send(true)
    .end(function (err, res) {
        if (err) {
            console.error(err);
        } else if (res.status !== 204) {
            console.error(res.body);
        } else {
            console.log('Activated neo4j auto-indexing');
        }
    });

['id','type','title'].forEach(function (property) {
    request.post(neo4jBaseUrl + '/db/data/index/auto/node/properties')
        .type('application/json')
        .send(property)
        .end(function (err, res) {
            if (err) {
                console.error(err);
            } else if (res.status !== 204) {
                console.error(res.body);
            } else {
                console.log('Added property ' + property + ' to neo4j auto-indexing.');
            }
        });
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
