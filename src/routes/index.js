'use strict';
var uuid = require('node-uuid');
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(
    process.env.NEO4J_URL || 'http://localhost:7474');

function getAbsoluteUriBase (req) {
    // we use req.get('host') as this also gives us the port
    return req.protocol + '://' + req.get('host');
}

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
    var node = db.createNode(req.body);
    node.data.type = 'movie';
    node.data.id = uuid.v4();
    node.save(function (error, savedNode) {
        if (error) {
            res.status(500).send();
            console.error(error);
        }

        res.status(201)
            .header('Location', getAbsoluteUriBase(req) +
                '/movies/' + node.data.id)
            .send(savedNode.data);
    });
};
