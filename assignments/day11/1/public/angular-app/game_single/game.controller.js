angular.module('meanGames').controller('GameController', GameController);

function _getStarRating(stars) {
    return new Array(stars)
}

function GameController(GameDataFactory, $routeParams) {
    const vm = this;
    const gameId = $routeParams.gameId
    GameDataFactory.getOneGame(gameId).then((response) => {
        vm.game = response;
        console.log(response);
        vm.rating = _getStarRating(vm.game.rate);

    })

    vm.deleteGame = function(gameId) {
        GameDataFactory.deleteOneGame(gameId).then(() => console.log("success"))
    }
}