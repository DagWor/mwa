angular.module('booksApp').controller('BookController', BookController);

function BookController($routeParams, BookDataFactory){
    let vm = this;
    let bookId = $routeParams.bookId
    BookDataFactory.getOneBook(bookId).then(response => vm.book = response)
    vm.deleteBook = function(bookId) {
        BookDataFactory.deleteOneBook(bookId).then(() => console.log("success"))
    }
}