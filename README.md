# Movie Database - NodeJS version

[![Build Status](https://travis-ci.org/codecentric/movie-database-node.png)](https://travis-ci.org/codecentric/movie-database-node)

Another version of the legendary movie database. This time with NodeJS. The app
is being deployed to Heroku after every push. Feel free to check it out:
[http://movie-database-node.herokuapp.com/](http://movie-database-node.herokuapp.com/)!

*More documentation is available through [http://codecentric.github.io/movie-database-node](http://codecentric.github.io/movie-database-node)*.

## Travis-CI and Heroku

This project uses [Travis-CI](https://www.travis-ci.org/) for
continuous integration. After every successfull build, the application
is deployed automatically to [Heroku](https://www.heroku.com/).

If you fork the project, you probably want to set up a CI/CD-pipeline
yourself. For Travis-CI, follow these steps (or take a look at the
guide [Travis-CI Getting started guide](http://about.travis-ci.org/docs/user/getting-started/)). If
you are interested in the travis-configuration, take a look at the
documented [.travis.yml](.travis.yml).

1. Fork the project on GitHub.
2. Create a Travis-CI account (you can login with your GitHub account).
3. Activate the Travis service hook for your fork of the project (on your profile page).
4. Change the build-status icon in this README.md file to the new travis project (https://travis-ci.org/YOUR_GITHUB_NAME/movie-database-node).

Deployment on Heroku is also easy. Just follow the [Getting started with Heroku and NodeJS guide](https://devcenter.heroku.com/articles/nodejs).
If you want your application to be deployed continuously, whenever a Travis-CI job succeeds, you have to encrypt your Heroku API Key and save it in the `.travis.yml` according to the [Travis CI documentation](http://about.travis-ci.org/docs/user/deployment/heroku/):

## System requirements

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
npm install -g grunt-cli bower
```

The most useful Grunt tasks currently is `test` for test execution and
`dev` to run a development mode. To execute these tasks, simple call
Grunt:

```
grunt dev
```

The development mode will automatically spin up a server which will be restarted
upon file changes. Furthermore all tests will be executed whenever you change
a file.

## Automatically restarting the express server on file changes

*You can stop reading right now when you are using the `grunt dev` task. The
task automatically restarts the server for you.*

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

Copyright (c) 2013-2014 codecentric AG

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
