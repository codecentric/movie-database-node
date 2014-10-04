module.exports = function() {
    'use strict';

    this.deleteButton = element(by.css('.btn-danger'));

    this.delete = function() {
        this.deleteButton.click();
    };
};
