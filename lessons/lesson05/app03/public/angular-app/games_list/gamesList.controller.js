angular.module('meanGames').controller('GamesListController', GamesListController);

function GamesListController(GameDataFactory) {
    let vm = this;
    vm.title = "Mean Games App";
    GameDataFactory.getAllGames().then((response) => vm.games = response)
}