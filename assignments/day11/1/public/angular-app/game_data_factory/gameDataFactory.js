angular.module('meanGames').factory('GameDataFactory', GameDataFactory);

function GameDataFactory($http) {
    return {
        getAllGames: function getAllGames() {
            return $http.get('/api/games').then(complete).catch(failed);
        },
        getOneGame: function getOneGame(gameId) {
            return $http.get(`/api/games/${gameId}`).then(complete).catch(failed)
        },
        addOneGame: function addOneGame(game){
            return $http.post('/api/games', game).then(complete).catch(failed)
        },
        deleteOneGame: function deleteOneGame(gameId){
            return $http.delete('/api/games/'+ gameId).then(complete).catch(failed)
        }
    }
}

function complete(response) {
    return response.data;
}

function failed(error) {
    return error.status.statusText;
}