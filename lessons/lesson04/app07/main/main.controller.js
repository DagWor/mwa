angular.module("properApp").controller("MainController", MainController);

function MainController(JokeFactory, $routeParams){
    let vm = this;
    /*$http.get(`https://official-joke-api.appspot.com/jokes/${jokeType}/random`).then((response) => {
        console.log(response.data);
        vm.jokes = response.data;
    })*/

    JokeFactory.getTenJokes().then(response => vm.jokes = response)
}