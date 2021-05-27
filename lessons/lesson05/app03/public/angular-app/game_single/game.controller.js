angular.module('meanGames').controller('GameController', GameController);

function _getStarRating(stars) {
    return new Array(stars)
}

function GameController(GameDataFactory, $routeParams) {
    let vm = this;
    let gameId = $routeParams.gameId
    GameDataFactory.getOneGame(gameId).then((response) => {
        vm.game = response;
        console.log(response);
        vm.rating = _getStarRating(vm.game.rate);
    })
}