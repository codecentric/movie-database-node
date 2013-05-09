'use strict';

// TODO: Explain usage
// TODO: Warning to not do sth like expect(res.status).to.equal(200), because
// res.status is the setter-function. res.statusCode is the thing you are looking for!

var ResponseMock = module.exports = function () {};
ResponseMock.prototype.status = function(val) {
    this.statusCode = val;
    return this;
};
ResponseMock.prototype.location = function(val) {
    this.location = val;
    return this;
};
ResponseMock.prototype.redirect = function() {
    if (arguments.length === 2) {
        this.statusCode = arguments[0];
        this.location = arguments[1];
    } else {
        this.statusCode = this.statusCode || 304;
        this.location = arguments[0];
    }
    this.send();
};
ResponseMock.prototype.send = function() {
    if (arguments.length === 2) {
        this.statusCode = arguments[0];
        this.body = arguments[1];
    } else if (arguments.length === 0) {
        this.statusCode = this.statusCode || 204;
    } else if ('number' === typeof(arguments[0])) {
        this.statusCode = arguments[0];
    } else {
        this.statusCode = this.statusCode || 200;
        this.body = arguments[0];
    }
    this.verificationCallback(this);
};
ResponseMock.prototype.verifySend = function(verificationCallback) {
    this.verificationCallback = verificationCallback;
};
ResponseMock.prototype.verificationCallback = function() {
    throw new Error('No verification function for response.');
};
