angular.module('properApp', ['ngRoute']).config(config)

function config($routeProvider){
    $routeProvider.when('/', {
        templateUrl: "main/main.html",
        controller: "MainController",
        controllerAs: "mainControl"
    }).when('/about', {
        templateUrl: "about/about.html",
        controller: "AboutController",
        controllerAs: "aboutControl"
    }).when('/jokes/:jokeType', {
        templateUrl: "joke/joke.html",
        controller: "JokeController",
        controllerAs: "jokeCtrl"
    }).otherwise({
        redirectTo: "/"
    })
}