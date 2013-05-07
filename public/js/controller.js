function AppCtrl ($scope, $rootScope, $location) {
    'use strict';
    $scope.title = 'The Movie Database';

    $rootScope.$on('$routeChangeError',
            function (event, current, previous, rejection) {
        if (rejection.status === 404) {
            $location.path('/404');
        }
    });
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
	// We should do something if this fails. But what?
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
