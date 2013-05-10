# Movie Database - NodeJS version

[![Build Status](https://travis-ci.org/mlex/movie-database-node.png)](https://travis-ci.org/mlex/movie-database-node)

Another version of the legendary movie database. This time with NodeJS. The app
is being deployed to Heroku after every push. Feel free to check it out:
[http://movie-database-node.herokuapp.com/](http://movie-database-node.herokuapp.com/)!

## System requirements

### Node.js

*Make sure that you have [node.js with NPM](http://nodejs.org/) installed on
your machine. You also need a Neo4j instance listening
on* `http://127.0.0.1:7474`.

This project uses a standard node.js module descriptor (`package.json`) and
[Grunt](http://gruntjs.com/) as a tool for test execution and static source
code analysis. To install the project's dependencies, simply run `npm install`
in the project's root directory. This will make sure that the development tools
are locally installed.

To make use of Grunt, you further need to have its CLI tool on your path.

```
npm install -g grunt-cli
```

The most useful Grunt tasks currently are `simplemocha` for test execution and
`jshint` for static source code analysis. To execute these tasks, simple call
Grunt:

```
grunt simplemocha
```

## Technologies

### Server
The code for the server is in the `src`-folder.

#### Express.js
* Web: http://expressjs.com/
* Source: https://github.com/visionmedia/express
* Documentation: http://expressjs.com/api.html

#### node-neo4j
* Source: https://github.com/thingdom/node-neo4j
* Documentation: http://coffeedoc.info/github/thingdom/node-neo4j/master/

### Client
The client-side code is in the `public`-folder. It is served via the express-server as static.

#### AngularJS
* Web: http://angularjs.org/
* Source: https://github.com/angular/angular.js
* Tutorial: http://docs.angularjs.org/tutorial/index
* API-Documentation: http://docs.angularjs.org/api

#### Bootstrap
* Web: http://twitter.github.io
* Source: https://github.com/twitter/bootstrap
* Documentation: http://twitter.github.io/bootstrap/components.html

### Testing

#### Karma
Test runner
* Web: http://karma-runner.github.io/
* Source: https://github.com/karma-runner/karma


#### Angular Scenario
Used to test the front-end
* Documentation: http://docs.angularjs.org/guide/dev_guide.e2e-testing
* Source: https://github.com/angular/angular.js/tree/master/src/ngScenario
* Matchers: https://github.com/angular/angular.js/blob/master/src/ngScenario/matchers.js


#### Mocha
Test Framework
* Web & Documentation: http://visionmedia.github.io/mocha/
* Source: https://github.com/visionmedia/mocha

#### Sinon.JS
Spys, Stubs, Mocks for (node)js tests
* Web: http://sinonjs.org
* Documentation: http://sinonjs.org/docs/
* Source: https://github.com/cjohansen/Sinon.JS

#### Chai
Library for for BDD and TDD style assertions
* Web & Documentation: http://chaijs.com/
* Source: https://github.com/chaijs/chai

## Automatically restarting the express server on file changes

Automatically restarting the server on file changes is desirable as this
increases your development pace.
[Supervisor](https://github.com/isaacs/node-supervisor) can help you with this.

```
# To install supervisor
npm install -g supervisor

# Then run the server
supervisor src/server.js
```

## Other Movie Database Implementations

 - [with Spring MVC](https://github.com/tobiasflohre/movie-database)
 - [with AngularJS and requireJS](https://github.com/bripkens/movie-database-spa)

## License (MIT)

Copyright (c) 2013 codecentric AG

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
