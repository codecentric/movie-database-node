'use strict';
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(
    process.env.NEO4J_URL || 'http://localhost:7474');

exports.hello = function (req, res) {
    res.send('Hello World - now automatically deployed!');
};

exports.movies = function (req, res) {
    db.getIndexedNodes(
        'node_auto_index', 'type', 'movie',
        function (err, nodes) {
            console.log(nodes);
            var movies = nodes.map(function (node) {
                return node.data;
            });
            res.send(movies);
        });
};
