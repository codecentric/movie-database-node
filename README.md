# Movie Database - NodeJS version

[![Build Status](https://travis-ci.org/mlex/movie-database-node.png)](https://travis-ci.org/mlex/movie-database-node)

Another version of the legendary movie database. This time with NodeJS.

## System requirements

### Neo4j

Make sure to define the following properties in your `neo4j.properties`:

```
# Enable auto-indexing for nodes, default is false
node_auto_indexing=true

# The node property keys to be auto-indexed, if enabled
node_keys_indexable=type,title,name
```

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
grunt nodeunit
```

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

Copyright (c) 2013 Participants of the codemotion Berlin codecentric tech lab

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
