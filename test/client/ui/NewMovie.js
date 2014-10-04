module.exports = function() {
    'use strict';

    // this.title = element(by.model('movie.title'));
    // this.description = element(by.model('movie.description'));
    // this.save = element(by.css('.btn-primary'));

    this.open = function() {
        browser.get('/movies/new');
    };

    this.addMovie = function(title, description) {
        this.open();
        element(by.model('movie.title')).clear();
        element(by.model('movie.title')).sendKeys(title);
        element(by.model('movie.description')).clear();
        element(by.model('movie.description')).sendKeys(description);
        element(by.css('.btn-primary')).click();
    };
};
