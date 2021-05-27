angular.module('booksApp').controller('BookListController', BookListController);

function BookListController(BookDataFactory, $location){
    let vm = this;
    let isSubmitted = false;
    BookDataFactory.getAllBooks().then(response => vm.books = response);
    vm.addBook = function() {
        console.log("wazza");
        const newBook = {
            title: vm.newBookTitle,
            price: vm.newBookPrice,
            edition: vm.newBookEdition,
            rating: vm.newBookRating,
            author: vm.newBookAuthor,
            title: vm.newBookTitle,
            year: vm.newBookYear
        }

        console.log(newBook)

        if(vm.bookForm.$valid) BookDataFactory.addOneBook(newBook).then(() => {
            console.log("success")
            $location.url('/')
        })
        else isSubmitted = true;
    }
}