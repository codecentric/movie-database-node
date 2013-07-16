'use strict';

var express = require('express');
var config = require('./config');
var log4js = require('log4js');
var logger = log4js.getLogger('app');
var historyApiFallback = require('connect-history-api-fallback');

var app = module.exports = express();

var serveDirectory = 'client';

// all environments
app.set('port', config.application.port);

// shortcut for favicon requests. Favicon requests do not need to go through
// the whole middleware (static middleware is the last in the chain).
app.use(express.favicon());

// Logs requests to the console
app.use(express.logger('dev'));

// Parses form data and makes this form data available through the request
// object: req.body
app.use(express.bodyParser());

// This middleware allows simulation of DELETE and other HTTP request types
// through a form parameter called _method. The value of this parameter then
// defines the request parameter.
app.use(express.methodOverride());

// we deactivate all caches. Really stupid idea in general, but hey, this is
// a workshop and it needs to be simple :-)
app.use(function cacheDeactivation (req, res, next) {
    res.header('Cache-Control', 'no-cache');
    next();
});

// provide a fallback for the history API, i.e. change the requested URL
var fallbackLogger = log4js.getLogger('historyApiFallback');
historyApiFallback.setLogger(fallbackLogger.trace.bind(fallbackLogger));
app.use(historyApiFallback);

// Enable the routes which are defined at the bottom of the file
app.use(app.router);

// Serve static files
app.use(express.static(serveDirectory));

// development only => extra error handling
if ('development' === app.get('env')) {
    app.use(express.directory(serveDirectory));
    app.use(express.errorHandler());
}

var routes = require('./routes')();
app.get('/movies', routes.movies.getMovies);
app.post('/movies', routes.movies.addMovie);
app.get('/movies/:id', routes.movies.getMovie);
app.put('/movies/:id', routes.movies.updateMovie);
// delete is a reserved word
app['delete']('/movies/:id', routes.movies.deleteMovie);
