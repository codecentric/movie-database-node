var app = require('../src/app.js');
var request = require('supertest');

describe('Index', function () {
    'use strict';
    it('should some page', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});
