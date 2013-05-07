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
    db.getIndexedNodes('node_auto_index', 'type', 'movie',
            function (err, nodes) {
        if (err) {
            console.error(err);
            return res.status(500).send();
        }

        // fallback in case no movies are stored in the database
        nodes = nodes || [];

        var movies = nodes.map(function (node) {
            return node.data;
        });

        res.send(movies);
    });
};


exports.getMovie = function (req, res) {
    var id = req.params.id;

    db.getIndexedNode('node_auto_index', 'id', id, function (err, node) {
        if (err) {
            res.status(500).send();
            console.error(err);
        } else if (!node) {
            res.status(404).send();
        } else {
            res.send(node.data);
        }
    });
};


exports.deleteMovie = function (req, res) {
    var id = req.params.id;
    console.log('Deleting movie ' + id);

    // TODO delete relationship once actors / votes have been added
    var cypher = 'START node = node:node_auto_index(id={id}) ' +
        'DELETE node';
    db.query(cypher, { id: id }, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send();
        }

        res.status(204).send();
    });
};


exports.addMovie = function (req, res) {
    var node = db.createNode(req.body);
    node.data.type = 'movie';
    node.data.id = uuid.v4();
    node.save(function (err, savedNode) {
        if (err) {
            console.error(err);
            return res.status(500).send();
        }

        res.status(201)
            .header('Location', getAbsoluteUriBase(req) +
                '/movies/' + node.data.id)
            .send(savedNode.data);
    });
};
