var app = require('../src/app.js');
var request = require('supertest');

describe('Index', function () {
    'use strict';
    it('should return hello world', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200)
            .expect('Hello World - now automatically deployed!', done);
    });
});
