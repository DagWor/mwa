angular.module('booksApp').controller('BookListController', BookListController);

function BookListController(BookDataFactory){
    let vm = this;
    BookDataFactory.getAllBooks().then(response => vm.books = response)
}