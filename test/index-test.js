/*jslint node:true*/
/*global describe: false, assert: false, it: false, beforeEach: false, before: false, after: false */

var app = require("../src/app.js"),
    request = require('supertest');

describe("Index", function () {
    'use strict';
    it('should return hello world', function (done) {
        request(app)
            .get("/")
            .expect("Content-Type", /html/)
            .expect(200)
            .expect("Hello World - now automatically deployed!", done);
    });
});
