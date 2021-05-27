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
        vm.editedGamePrice = game.price
        vm.editedGameYear = game.year
        vm.editedGameTitle = game.title
        vm.editedGameRate = game.rate

    })

    vm.updateGame = function() {
        const game = {
            title: vm.editedGameTitle,
            year: vm.editedGameYear,
            price: vm.editedGamePrice,
            rate: vm.editedGameRate,
            minPlayers: vm.game.minPlayers,
            maxPlayers: vm.game.maxPlayers,
            minAge: vm.game.minAge,
            designers: vm.game.designers,
            publisher: vm.game.publisher
        }
        console.log(game    )

        GameDataFactory.replaceOneGame(gameId, game).then(() => console.log("success"))
    }
}