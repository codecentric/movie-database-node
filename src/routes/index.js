'use strict';
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(
    process.env.NEO4J_URL || 'http://localhost:7474');

var defaultSuccessObject = { ok: true };

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

exports.getMovie = function (req, res) {
    var id = req.params.id;
    // TODO how to retrieve movie => UUID?
    res.send({
        title: 'Foobar'
    });
};

exports.deleteMovie = function (req, res) {
    var id = req.params.id;
    // TODO actually delete movie from database
    console.log('Deleting movie ' + id);
    res.status(204).send();
};

exports.addMovie = function (req, res) {
    console.log(req.body);
    var node = db.createNode(req.body);
    node.save(function (error, savedNode) {
        res.send(savedNode.data);
    });
};
