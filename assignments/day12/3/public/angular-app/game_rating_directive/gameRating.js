angular.module('booksApp').directive('gameRating', GameRating);

function GameRating() {
    return {
        restrict: "E",
        templateUrl: 'angular-app/game_rating_directive/game_rating.html',
        $scope: {
            stars: '=stars'
        }
    }
}