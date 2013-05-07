function AppCtrl ($scope) {
    'use strict';
    $scope.title = 'The Movie Database';
}

function WelcomeCtrl () {
}

function MoviesListCtrl ($scope, $location,moviesResponse) {
    'use strict';
    $scope.movies = moviesResponse.data;
    $scope.add = function () {
        $location.path('/movies/new');
    };
}

MoviesListCtrl.resolve = {
    moviesResponse: function ($http) {
        'use strict';
        return $http.get('/movies');
    }
};

function MoviesAddCtrl ($scope, $http, $location) {
    'use strict';
    $scope.movie = {};
    $scope.save = function (movie) {
        $http.post('/movies', movie)
            .success(function(res) {
                $location.path('/movies/' + res.id);
            });
    };
}

function MovieDetailCtrl ($scope, moviesResponse) {
    'use strict';
    $scope.movie = moviesResponse.data;
}

MovieDetailCtrl.resolve = {
    moviesResponse: function ($http, $route) {
        'use strict';
        var id = $route.current.params.id;
        return $http.get('/movies/' + id);
    }
};

function NotFoundCtrl () {
}

function ErrorCtrl() {
}