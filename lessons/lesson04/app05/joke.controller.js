angular.module("properApp").controller("JokeController", JokeController);

function JokeController($http, $routeParams){
    let vm = this;
    let jokeType = $routeParams.jokeType;
    $http.get(`https://official-joke-api.appspot.com/jokes/${jokeType}/random`).then((response) => {
        console.log(response.data);
        vm.jokes = response.data;
    })
}