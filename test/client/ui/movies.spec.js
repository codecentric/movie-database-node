'use strict';

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var MovieOverview = require('./MovieOverview');
var NewMovie = require('./NewMovie');
var MovieDetail = require('./MovieDetail');

describe('Movies', function() {
    var movieOverview;
    var newMovie;
    var movieDetail;

    function deleteMovies() {
        return request({
            method: 'GET',
            uri: 'http://localhost:3000/movies',
            json: true
        })
        .then(function(response) {
            var movies = response[1];
            return Promise.all(movies.map(function(movie) {
                return request({
                    method: 'DELETE',
                    uri: 'http://localhost:3000/movies/' + movie.id
                });
            }));
        });
    }

    beforeEach(function(done) {
        movieOverview = new MovieOverview();
        newMovie = new NewMovie();
        movieDetail = new MovieDetail();

        return deleteMovies().then(function() {
            movieOverview.open();
            done();
        });
    });

    it('should be accessible', function() {
        expect(movieOverview.heading.getText()).toEqual('Movie List');
    });

    it('should enable addition of movies', function() {
        movieOverview.navigateToAddMovie();
        expect(browser.getCurrentUrl()).toMatch(/\/movies\/new$/);
    });

    it('should add movies and forward to the detail view', function() {
        newMovie.addMovie('The Dark Knight', 'When Batman, Gordon and Harvey Dent ' +
            'launch an assault on the mob, they let the clown out of the ' +
            'box, the Joker, bent on turning Gotham on itself and bringing ' +
            'any heroes down to his level.');
        newMovie.addMovie('The Dark Knight Rises', 'Eight years on, a new evil rises ' +
            'from where the Batman and Commissioner Gordon tried to bury it, ' +
            'causing the Batman to resurface and fight to protect Gotham ' +
            'City... the very city which brands him an enemy.');
        newMovie.addMovie('Cloud Atlas', 'An exploration of how the actions of ' +
            'individual lives impact one another in the past, present and ' +
            'future, as one soul is shaped from a killer into a hero, and ' +
            'an act of kindness ripples across centuries to inspire a ' +
            'revolution.');
        newMovie.addMovie('Ted', 'As the result of a childhood wish, John Bennett\'s ' +
            'teddy bear, Ted, came to life and has been by John\'s side ever ' +
            'since - a friendship that\'s tested when Lori, John\'s ' +
            'girlfriend of four years, wants more from their relationship.');
        newMovie.addMovie('The Meerkats', 'An inspiring exploration of one family\'s ' +
            'resilience and fortitude shot using innovative and ' +
            'groundbreaking filming techniques.');
        newMovie.addMovie('Undisputed II: Last Man Standing', 'Sequel to the 2002 ' +
            'film. This time, Heavyweight Champ George "Iceman" Chambers is ' +
            'sent to a Russian Jail on trumped-up drug charges.');

        movieOverview.open();
        movieOverview.movieTitles.then(function(elements) {
            expect(elements.length).toEqual(6);
        });
    });
});
