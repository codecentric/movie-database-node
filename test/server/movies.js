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
    var responseMock;

    beforeEach(function() {
        // Create stubs for the neo4j-db-api
        dbStub = sinon.createStubInstance(neo4j.GraphDatabase);
        
        // load the routes and inject the d-stub
        routes = require('../../server/routes')(dbStub);
        movies = routes.movies;

        // the ResponseMock behaves like an express.js response object,
        // it stores the data that would normally be sent to the client
        // and can be used to execute verifications on this data
        responseMock = new ResponseMock();
    });

    it('should return an empty list when neo returns null', function (done) {
        // The getIndexedNodes method takes a callback-function as last parameter
        // with the yieldsAsAsync method, we tell out stub to behave like the real 
        // neo4j-db-object and the callback-function with the given parameters (null, null).
        dbStub.getIndexedNodes
            .withArgs('node_auto_index', 'type', 'movie')
            .yieldsAsync(
                null,
                null
            );

        // we could also write this with plain javascript as follows:
        // dbStub.getIndexedNodes = function() {
        //     if (arguments[0] == 'node_auto_index' &&
        //         arguments[1] == 'type' &&
        //         arguments[2] == 'movie') {
        //         arguments[3].call(null, null);
        //     }
        // };
                

        // execute the method we want to test and pass the ResponseMock object, 
        // that will be used for verifications later
        movies.getMovies({}, responseMock);

        // now lets execute some verifications
        responseMock.verify(function(responseData) {
            // the responseData object contains information about the
            // response, that would normally be sent to the client
            expect(responseData.status).to.equal(200);
            expect(responseData.body).to.be.instanceOf(Array);
            expect(responseData.body).to.be.empty;
            // last thing to do: notify mocha, that the test is now finished!
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

        movies.getMovies({}, responseMock);

        responseMock.verify(function(responseData) {
            expect(responseData.status).to.equal(200);
            expect(responseData.body).to.be.instanceOf(Array);
            expect(responseData.body).to.be.empty;
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

        movies.getMovies({}, responseMock);

        responseMock.verify(function(responseData) {
            expect(responseData.status).to.equal(500);
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

        movies.getMovies({}, responseMock);

        responseMock.verify(function(responseData) {
            expect(responseData.status).to.equal(200);
            expect(responseData.body).to.be.instanceOf(Array);
            expect(responseData.body).to.have.length(2);
            expect(responseData.body[0]).to.have.property('title')
                .that.equals('Lord of the Rings');
            done();
        });
    });
});
