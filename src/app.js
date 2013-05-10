'use strict';

var express = require('express');
var routes = require('./routes')();
var config = require('./config');

var app = module.exports = express();

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

// Enable the routes which are defined at the bottom of the file
app.use(app.router);

// Serve static files
app.use(express.static('public'));

// development only => extra error handling
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/hello', routes.hello);
app.get('/movies', routes.getMovies);
app.post('/movies', routes.addMovie);
app.get('/movies/:id', routes.getMovie);
app.put('/movies/:id', routes.updateMovie);
// delete is a reserved word
app['delete']('/movies/:id', routes.deleteMovie);
