angular.module('booksApp', ['ngRoute']).config(config)

function config($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'angular-app/books_list/books.html',
        controller: 'BookListController',
        controllerAs: 'vm'
    }).when('/books/:bookId', {
        templateUrl: 'angular-app/book_one/book.html',
        controller: 'BookController',
        controllerAs: 'vm'
    })
}