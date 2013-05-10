# Neo4j


## Links

 * [Hompeage](http://www.neo4j.org/)
 * [Cypher Cheat Sheet](http://assets.neo4j.org/download/Neo4j_CheatSheet_v3.pdf)
 * [REST API documentation](http://docs.neo4j.org/chunked/stable/rest-api.html)
 * [Node.js client library](https://github.com/thingdom/node-neo4j)
 * [Node.js client library API documentation](http://coffeedoc.info/github/thingdom/node-neo4j/master/)


## Neo4j Configuration

As mentioned above, Neo4j needs to be running listening on
`http://127.0.0.1:7474`. Apart from this, you also need to enable node auto
indexing. Once enabled, nodes' properties will automatically be indexed. You
can activate and configure node auto indexing through the file
`conf/neo4j.properties` in your Neo4j directory. The necessary configuration
looks like this.

```
# Enable auto-indexing for nodes, default is false
node_auto_indexing=true

# The node property keys to be auto-indexed, if enabled
node_keys_indexable=id,type,title,name
```

You will need to restart Neo4j after changing the configuration file.
Additionally, you need to create the index once using the Neo4j console. The
Neo4j console can be accessed through the
[web administration interface](http://127.0.0.1:7474/webadmin/) or using the
command line application `bin/neo4j-shell`.

In the shell, execute the following command to create the node auto index.

```
index --create node_auto_index -t Node
```

*In case you are wondering why you need to do this: Even though the index is
called the auto index, you can only query it after at least one node has been
added to the database (which then automatically creates the index) or after
you have created it manually. Trying to query the index without fulfilling at
least one of the previously mentioned conditions will result in an error.*

As much as possible, the application tries to configure automatic indexing at
application start through
[Neo4j's web service](http://docs.neo4j.org/chunked/milestone/rest-api-configurable-auto-indexes.html).

## Emptying the Neo4j database and starting over

To clear the database, you only need to delete the directory `data/graph.db`.
Please note that you should only do this once Neo4j is shut down (at the very
least, Neo4j requires a restart in order to properly work again after deleting
the directory). Also, please note that you should create the node auto index
after resetting the database (as mentioned above). A convenient way to do this
is the following bash script. It needs to be execute in your Neo4j installation
directory.

```
# stop the server, delete the current graph, restart it and create the auto index
sudo /etc/init.d/neo4j-service stop && \
    sudo rm -rf data/graph.db/ && \
    sudo /etc/init.d/neo4j-service start && \
    bin/neo4j-shell -c "index --create node_auto_index -t Node"
```
