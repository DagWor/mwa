angular.module('properApp', ['ngRoute']).config(config)

function config($routeProvider){
    $routeProvider.when('/', {
        templateUrl: "templates/main.html",
        controller: "MainController",
        controllerAs: "mainControl"
    }).when('/about', {
        templateUrl: "templates/about.html",
        controller: "AboutController",
        controllerAs: "mainControl"
    }).otherwise({
        redirectTo: "/"
    })
}