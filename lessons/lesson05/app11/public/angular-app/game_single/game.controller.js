angular.module('meanGames').controller('GameController', GameController);

function _getStarRating(stars) {
    return new Array(stars)
}

function GameController(GameDataFactory, $routeParams, $location, AuthFactory) {
    const vm = this;
    const gameId = $routeParams.gameId

    vm.isLoggedIn = () => { return AuthFactory.auth.isLoggedIn; }

    GameDataFactory.getOneGame(gameId).then((response) => {
        vm.game = response;
        console.log(response);
        vm.rating = _getStarRating(vm.game.rate);
        vm.editedGamePrice = game.price
        vm.editedGameYear = game.year
        vm.editedGameTitle = game.title
        vm.editedGameRate = game.rate

    })

    vm.updateGame = function () {
        const game = {
            title: vm.editedGameTitle,
            year: vm.editedGameYear,
            price: vm.editedGamePrice,
            rate: vm.editedGameRate
        }

        if (vm.game.minPlayers) game.minPlayers = vm.game.minPlayers
        if (vm.game.maxPlayers) game.maxPlayers = vm.game.maxPlayers
        if (vm.game.minAge) game.minAge = vm.game.minAge
        if (vm.game.designers) game.designers = vm.game.designers
        if (vm.game.publisher) game.publisher = vm.game.publisher

        GameDataFactory.replaceOneGame(gameId, game).then(() => {
            console.log("success");
            $location.path("/");
        })
    }
}