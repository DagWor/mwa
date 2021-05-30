angular.module('meanGames', ['ngRoute']).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when('/', {
        templateUrl: 'angular-app/welcome/welcome.html',
    }).when('/games', {
        templateUrl: 'angular-app/games_list/gamesList.html',
        controller: 'GamesListController',
        controllerAs: 'vm'
    }).when('/games/:gameId', {
        templateUrl: 'angular-app/game_single/game.html',
        controller: 'GameController',
        controllerAs: 'vm'
    }).when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
    })
}