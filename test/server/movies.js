'use strict';
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var neo4j = require('neo4j');
var ResponseMock = require('./helper/response-mock');

describe('getMovie', function () {
    var dbStub;
    var routes;
    var movies;
    var res;

    beforeEach(function() {
        dbStub = sinon.createStubInstance(neo4j.GraphDatabase);
        routes = require('../../server/routes')(dbStub);
        movies = routes.movies;
        res = new ResponseMock();
    });

    it('should return an empty list when neo returns null', function (done) {
        dbStub.getIndexedNodes
            .withArgs('node_auto_index', 'type', 'movie')
            .yieldsAsync(
                null,
                null
            );

        movies.getMovies({}, res);

        res.verifySend(function() {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.instanceOf(Array);
            expect(res.body).to.be.empty;
            done();
        });
    });

    it('should return an empty list when neo returns []', function (done) {
        dbStub.getIndexedNodes
            .withArgs('node_auto_index', 'type', 'movie')
            .yieldsAsync(
                null,
                null
            );

        movies.getMovies({}, res);

        res.verifySend(function() {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.instanceOf(Array);
            expect(res.body).to.be.empty;
            done();
        });
    });

    it('should return internal-server-error when neo returns error', function (done) {
        dbStub.getIndexedNodes
            .withArgs('node_auto_index', 'type', 'movie')
            .yieldsAsync(
                'an error',
                null
            );

        movies.getMovies({}, res);

        res.verifySend(function() {
            expect(res.statusCode).to.equal(500);
            done();
        });
    });

    it('should return a list of movies', function (done) {
        dbStub.getIndexedNodes
            .withArgs('node_auto_index', 'type', 'movie')
            .yieldsAsync(
                null,
                [{data: {title:'Lord of the Rings', description:'Description'}},
                 {data: {title:'Django Unchained', description:'Another Description'}}]
            );

        movies.getMovies({}, res);

        res.verifySend(function() {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.instanceOf(Array);
            expect(res.body).to.have.length(2);
            expect(res.body[0]).to.have.property('title')
                .that.equals('Lord of the Rings');
            done();
        });
    });
});
