'use strict';

// The ResponseMock object can be used in unit-tests for express.js applications.
//
// It behaves like the request-object used by express.js. Calls to methods like 'send',
// 'redirect', 'location' and 'status' change the internal state of the ResponseMock object.
// To verify the internal state at the end of a test, the 'verifySend' method can be used.
//
// Example:
// 
// it('should return a 404 response', function (done) {
//     responseMock = new ResponseMock();
//     controller.get('/does/not/exist', responseMock);
//     responseMock.verify(function(responseData) {
//         expect(responseData.status).to.equal(404);
//     })
// }
//
var ResponseMock = module.exports = function () {
    this.responseData = {
        status: null,
        headers: {},
        body: null
    };
};

// Set the response status to the given value
ResponseMock.prototype.status = function(val) {
    this.responseData.status = val;
    return this;
};

// Set the location header to the given value is used to change the locat
ResponseMock.prototype.location = function(val) {
    return this.set('Location', val);
};

// Set the location header to the given value is used to change the locat
ResponseMock.prototype.set = function(key, val) {
    this.responseData.headers[key] = val;
    return this;
};

// Alias to the set-method
ResponseMock.prototype.header = ResponseMock.prototype.set;

// Set the location header to the given url and the status to the given 
// status (or 304 if no explicit status is yet given) and call send() afterwards.
ResponseMock.prototype.redirect = function() {
    if (arguments.length === 2) {
        this.status(arguments[0]);
        this.location(arguments[1]);
    } else {
        this.status(this.responseData.status || 304);
        this.location(arguments[0]);
    }
    this.send();
};

// Send the response to the client. Because we are only a mock-implementation,
// this is the signal to verify the response that would normally be sent.
// For this verification, the verificationCallback is used!
ResponseMock.prototype.send = function() {
    if (arguments.length === 2) {
        this.status(arguments[0]);
        this.responseData.body = arguments[1];
    } else if (arguments.length === 0) {
        this.status(this.responseData.status || 204);
    } else if ('number' === typeof(arguments[0])) {
        this.status(arguments[0]);
    } else {
        this.status(this.responseData.status || 200);
        this.responseData.body = arguments[0];
    }
    this.verificationCallback(this.responseData);
};

// Define a method, that is used to verify the response sent to the client
ResponseMock.prototype.verify = function(verificationCallback) {
    this.verificationCallback = verificationCallback;
};

// the defauld verification callback simply throws an exception
ResponseMock.prototype.verificationCallback = function() {
    throw new Error('No verification function for response.');
};
