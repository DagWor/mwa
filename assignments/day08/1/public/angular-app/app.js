angular.module('gamesApp', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'angular-app/games_list/gamesList.html',
        controller: 'GamesListController',
        controllerAs: 'gmctrl'
    }).when('/games/:gameId', {
        templateUrl: 'angular-app/game_single/game.html',
        controller: 'GameController',
        controllerAs: 'gm'
    })
}