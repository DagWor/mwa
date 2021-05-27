angular.module('meanGames').directive('gameRating', GameRating);

function GameRating() {
    return {
        restrict: "E",
        templateUrl: 'angular-app/game_rating_directive/game_rating.html',
        bindToController: true,
        controller: 'GameController',
        controllerAs: 'vm',
        scope: {
            starts: '@'
        }
    }
}