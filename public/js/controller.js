function AppCtrl ($scope) {
    'use strict';
    $scope.title = 'The Movie Database';
}

function WelcomeCtrl () {
}

function MoviesCtrl ($scope, moviesResponse) {
    'use strict';
    $scope.title = 'Movie List';
    $scope.movies = moviesResponse.data;
}

MoviesCtrl.resolve = {
    moviesResponse: function ($http) {
        'use strict';
        return $http.get('/movies');
    }
};

function NotFoundCtrl () {
}
