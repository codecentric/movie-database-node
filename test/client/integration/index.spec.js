
describe('Movies', function () {
    'use strict';
    var baseUrl = '/movies';
    var addMovieUrl = '/movies/new';

    beforeEach(function () {
        var deleteMovie = function () {
            browser().navigateTo(baseUrl);
            element('table tbody').query(function (tbody, done) {
                var children = tbody.children();

                if (children.length > 0) {
                    element('table tbody a').click();
                    element('.btn-danger').click();
                }

                if (children.length > 1) {
                    deleteMovie();
                }

                done();
            });

        };

        deleteMovie();
        browser().navigateTo(baseUrl);
    });

    it('should be accessible', function () {
        expect(element('h1').text()).toEqual('Movie List');
    });

    it('should allow adding of movies', function () {
        element('.btn-primary').click();
        expect(browser().window().path()).toEqual('/movies/new');
    });

    function addMovie (title, description) {
        browser().navigateTo(addMovieUrl);
        input('movie.title').enter(title);
        input('movie.description').enter(description);
        element('.btn-primary').click();
    }

    function addTestMovies () {
        // The short description of each of the following movies was copied
        // from the IMDB. [Insert further copyright notices here] ;-)

        addMovie('The Dark Knight', 'When Batman, Gordon and Harvey Dent ' +
            'launch an assault on the mob, they let the clown out of the ' +
            'box, the Joker, bent on turning Gotham on itself and bringing ' +
            'any heroes down to his level.');
        addMovie('The Dark Knight Rises', 'Eight years on, a new evil rises ' +
            'from where the Batman and Commissioner Gordon tried to bury it, ' +
            'causing the Batman to resurface and fight to protect Gotham ' +
            'City... the very city which brands him an enemy.');
        addMovie('Cloud Atlas', 'An exploration of how the actions of ' +
            'individual lives impact one another in the past, present and ' +
            'future, as one soul is shaped from a killer into a hero, and ' +
            'an act of kindness ripples across centuries to inspire a ' +
            'revolution.');
        addMovie('Ted', 'As the result of a childhood wish, John Bennett\'s ' +
            'teddy bear, Ted, came to life and has been by John\'s side ever ' +
            'since - a friendship that\'s tested when Lori, John\'s ' +
            'girlfriend of four years, wants more from their relationship.');
        addMovie('The Meerkats', 'An inspiring exploration of one family\'s ' +
            'resilience and fortitude shot using innovative and ' +
            'groundbreaking filming techniques.');
        addMovie('Undisputed II: Last Man Standing', 'Sequel to the 2002 ' +
            'film. This time, Heavyweight Champ George "Iceman" Chambers is ' +
            'sent to a Russian Jail on trumped-up drug charges.');
    }

    it('should add movies and forward to the detail view', function () {
        addTestMovies();

        // look for it on the overview page
        browser().navigateTo(baseUrl);
        expect(repeater('table tbody tr').count()).toBeGreaterThan(0);
    });
});
