/*jshint maxstatements:50 */

'use strict';
var uuid = require('node-uuid');
var logger = require('log4js').getLogger('routes/movies');

exports = module.exports = function (db) {

    if (!db) {
        throw new Error('No database configured');
    }

    var exports = {};

    // helper function to return the absolute base uri used in the request
    function getAbsoluteUriBase (req) {
        // we use req.get('host') as this also gives us the port
        return req.protocol + '://' + req.get('host');
    }

    // return a list of all movies
    exports.getMovies = function (req, res) {
        logger.debug('Retrieving a list of all movies');
        db.getIndexedNodes('node_auto_index', 'type', 'movie',
                function (err, nodes) {
            if (err) {
                logger.error('Failed to load a list of all movies', err);
                return res.status(500).send();
            }

            // fallback in case no movies are stored in the database
            nodes = nodes || [];

            // the attributes of the movie (like title, description) are stored inside
            // the data-attribute, so we loop through all retrieved nodes and extract
            // the data-attribute
            var movies = nodes.map(function (node) {
                return node.data;
            });

            logger.debug('Successfully loaded %d movies.', movies.length);
            res.send(movies);
        });
    };

    // return a single movie identified by url-parameter
    exports.getMovie = function (req, res) {
        // extract the id from the request-object
        var id = req.params.id;
        logger.debug('Retrieving movie#%s from database.', id);

        // movies are indexed by id
        db.getIndexedNode('node_auto_index', 'id', id, function (err, node) {
            if (err) {
                logger.error('Failed to retrieve movie#%s: %s', id, err);
                return res.status(500).send();
            } else if (!node) {
                logger.debug('Movie#%s could not be found.', id);
                return res.status(404).send();
            }
            logger.debug('Found movie#%s with title: %s', id, node.data.title);
            res.send(node.data);
        });
    };


    exports.deleteMovie = function (req, res) {
        var id = req.params.id;
        logger.debug('Deleting movie#%s', id);

        var cypher = 'START node=node:node_auto_index(id={id}) ' +
            'OPTIONAL MATCH node-[relationship]-() ' +
            'DELETE node, relationship';
        db.query(cypher, { id: id }, function (err) {
            if (err) {
                logger.error('Failed to delete movie#%s: %s', id, JSON.stringify(err));
                return res.status(500).send();
            }

            res.status(204).send();
        });
    };


    exports.addMovie = function (req, res) {
        var node = db.createNode(req.body);
        node.data.type = 'movie';
        node.data.id = uuid.v4();
        logger.debug('Adding a new movie');
        node.save(function (err, savedNode) {
            if (err) {
                logger.error('Failed to add movie: %s', err);
                return res.status(500).send();
            }

            logger.debug('Added new movie with id %s', savedNode.data.id);
            res.status(201)
                .location(getAbsoluteUriBase(req) +
                    '/movies/' + node.data.id)
                .send(savedNode.data);
        });
    };


    exports.updateMovie = function (req, res) {
        var id = req.params.id;
        db.getIndexedNode('node_auto_index', 'id', id, function (err, node) {
            if (err) {
                logger.error('Failed to retrieve movie#%s for update: %s',
                    id,
                    err);
                return res.status(500).send();
            } else if (!node) {
                logger.debug('Movie#%s could not be found for update.', id);
                return res.status(404).send();
            }
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key) && key !== 'id') {
                    node.data[key] = req.body[key];
                }
            }
            node.save(function (err, savedNode) {
                if (err) {
                    logger.error('Failed to update movie#%s: %s', id, err);
                    return res.status(500).send();
                }

                logger.debug('Successfully updated movie#%s.', id);
                res.send(savedNode.data);
            });
        });
    };

    return exports;
};
