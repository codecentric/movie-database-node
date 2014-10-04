module.exports = function() {
    'use strict';

    this.title = element(by.model('movie.title'));
    this.description = element(by.model('movie.description'));
    this.save = element(by.css('.btn-primary'));

    this.open = function() {
        browser.get('/movies/new');
    };

    this.addMovie = function(title, description) {
        this.open();
        this.title.clear();
        this.title.sendKeys(title);
        this.description.clear();
        this.description.sendKeys(description);
        this.save.click();
    };
};
