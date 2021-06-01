angular.module('meanGames').directive('gamesNavigation', GamesNavigation)

function GamesNavigation() {
    return {
        restrict: "E",
        templateUrl: 'angular-app/navigation_directive/navigation.html'
    };
}