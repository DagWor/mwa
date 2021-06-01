angular.module('meanGames').controller('GamesListController', GamesListController);

function GamesListController(GameDataFactory, AuthFactory) {
    let vm = this;
    vm.title = "Mean Games App";
    // vm.isSubmitted = false;
    vm.isLoggedIn = () => { return AuthFactory.auth.isLoggedIn; }

    GameDataFactory.getAllGames().then((response) => vm.games = response)
    vm.addGame = function () {
        const postData = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            maxPlayers: vm.newGameMaxPlayers,
            minPlayers: vm.newGameMinPlayers,
            rate: vm.newGameRating,
            year: vm.newGameYear,
            minAge: vm.newGameMinAge,
            designers: vm.newGameDesigner
        }
        if (vm.gameForm.$valid) {
            console.log(postData);
            GameDataFactory.addOneGame(postData).then(() => console.log("success"))
        }
    }

}