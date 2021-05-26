angular.module('gamesApp').controller('GamesListController', GamesListController);

function GamesListController(GameDataFactory) {
    let vm = this;
    vm.title = "List of Games";
    GameDataFactory.getAllGames().then(response => vm.games = response)
}