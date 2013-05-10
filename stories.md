# Stories for codemotion tech lab

  1. As a user I want to see the movie overview list on the application's
     landing page.
  2. As a user I want to see the movies sorted by name.
  3. As a user I want to be able to change the sorting order of movies.
  4. As a user I want to be able to open the *add movie* page in a new tab
     using web browsers' standard mechanisms.
  5. As a user I want to be able to create actors. Each actor has a name
     and a short biography.
  6. As a user I want to be able to see a list of actors.
  7. As a user I want to connect actors and movies.
  8. As a user I want to see a movie's actors.
  9. As a user I want to remove actors from a movie.
  10. As a user I want to be able to define movies' release years.
  11. As a user I want to be able to sort movies either by
      movie title or release year.
  12. As a user I want my input to be validated when creating movies.
      Movies need a title and a release year.
  13. As a user I want my input to be validated when creating actors. Each
      actor needs to have a name.
  14. As a user I want to search for movies and actors.
  15. As a user I want to be able to tell my friends about movies through a
      Twitter integration.

**Note: Always be sure to understand the stories and the authors' intention
before starting the implementation.**

## Tips

 2.) AngularJS has an [*orderBy* filter](http://docs.angularjs.org/api/ng.filter:orderBy).

 3.) The AngularJS *orderBy* filter can reverse the sorting order.

 4.) Take a look at the difference between the links to the movie detail pages
    and the *add movie* button.

 7.) A simple multi select box on the create actor form suffices. To create
    relationships between nodes, you can call the function
    `createRelationshipTo(otherNode, type, data, callback)` on the node
    object ([API documentation](http://coffeedoc.info/github/thingdom/node-neo4j/master/)).

 8.) You can call the function `getRelationships(type, callback)`
    on the node object which you get from `db.getIndexedNode`
    ([API documentation](http://coffeedoc.info/github/thingdom/node-neo4j/master/)).

 9.) Check out the cypher query for deleting relationships. You can find this on
    the cypher cheat sheet.

 11.) The selection could be done using a toggle button, i.e. two buttons with
     two separate click listeners. You can visually connect buttons using
     Twitter Bootstrap (which is already included).

```
    <div class="btn-group">
      <button class="btn ative">Title</button>
      <button class="btn">Year</button>
    </div>
```

 12.) The AngularJS directive [*ngChange*](http://docs.angularjs.org/api/ng.directive:ngChange) is handy for validations.

 15.) Twitter provides
      [a few buttons](https://twitter.com/about/resources/buttons)
      that are simple to integrate.