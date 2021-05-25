angular.module('meanGames').controller('GameController', GameController);

function GameController(GameDataFactory, $routeParams) {
    let vm = this;
    let gameId = $routeParams.gameId
    GameDataFactory.getOneGame(gameId).then((response) => vm.game = response)
}