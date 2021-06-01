angular.module('meanGames', ['ngRoute', "angular-jwt"]).config(config).run(run);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when('/', {
        templateUrl: 'angular-app/welcome/welcome.html',
        access: { restricted: false }
    }).when('/games', {
        templateUrl: 'angular-app/games_list/gamesList.html',
        controller: 'GamesListController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/games/:gameId', {
        templateUrl: 'angular-app/game_single/game.html',
        controller: 'GameController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/login', {
        templateUrl: 'angular-app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/profile', {
        templateUrl: 'angular-app/profile/profile.html',
        access: { restricted: true }
    }).otherwise({
        redirectTo: "/"
    })
}

function run($rootScope, $location, AuthFactory, $window) {
    $rootScope.$on("$routeChangeStart", (event, nextRoute, currentRoute) => {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/')
        }
    })
}