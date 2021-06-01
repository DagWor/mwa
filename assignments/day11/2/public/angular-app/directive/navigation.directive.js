angular.module('booksApp').directive('bookNavigation', BooksNavigation)

function BooksNavigation() {
    return {
        restrict: "E",
        templateUrl: 'angular-app/directive/navigation.html'
    };
}