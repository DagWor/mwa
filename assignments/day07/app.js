angular.module("apiApp", ['ngRoute']).config(config)

function config($routeProvider){
    $routeProvider.when('/', {
        templateUrl: "templates/apis.html",
        controller: "ApiController",
        controllerAs: "apiCtrl"
    }).otherwise({
        redirectTo: "/"
    })
}