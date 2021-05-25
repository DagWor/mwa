angular.module("properApp").controller("JokeController", JokeController);

function JokeController(JokeFactory){
    let vm = this;
    /*let jokeType = $routeParams.jokeType;
    $http.get(`https://official-joke-api.appspot.com/jokes/${jokeType}/random`).then((response) => {
        console.log(response.data);
        vm.jokes = response.data;
    })*/

    JokeFactory.getTenJokes().then((response) => vm.jokes = response)
}