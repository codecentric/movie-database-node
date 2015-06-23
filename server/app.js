'use strict';

var bodyParser = require('body-parser');
var config = require('./config');
var errorhandler = require('errorhandler');
var express = require('express');
var historyApiFallback = require('connect-history-api-fallback');
var log4js = require('log4js');
var methodOverride = require('method-override');
var morgan = require('morgan');
var serveStatic = require('serve-static');

var app = module.exports = express();

// all environments
app.set('port', config.application.port);

// Logs requests to the console
app.use(morgan('combined'));

// Parses form data and makes this form data available through the request
// object: req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This middleware allows simulation of DELETE and other HTTP request types.
app.use(methodOverride());

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

// all requests, that are not handled by static or historyApiFallback
// are handled by the following routing mechanism.
var routes = require('./routes')();
app.get('/movies', routes.movies.getMovies);
app.post('/movies', routes.movies.addMovie);
app.get('/movies/:id', routes.movies.getMovie);
app.put('/movies/:id', routes.movies.updateMovie);
// delete is a reserved word
app['delete']('/movies/:id', routes.movies.deleteMovie);

// Serve static files
app.use(serveStatic('client'));
app.use(serveStatic('node_modules'));

// development only => extra error handling
if (process.env.NODE_ENV === 'development') {
    console.log('app is in dev mode');
    app.use(errorhandler());
}

