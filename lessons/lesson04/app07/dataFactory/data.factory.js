angular.module("properApp").factory('JokeFactory', JokeFactory);

function JokeFactory($http) {
    return {
        getTenJokes: function getTenJokes(){
            return $http.get(`https://official-joke-api.appspot.com/jokes/ten`).then(complete).catch(failed)
        },
        getOneJoke: function getOneJoke(jokeType){
            return $http.get(`https://official-joke-api.appspot.com/jokes/${jokeType}/random`).then(complete).catch(failed)
        }
    }
};

function complete(response) {
    console.log(response)
    return response.data;
}

function failed(error){
    return error.statusText
}