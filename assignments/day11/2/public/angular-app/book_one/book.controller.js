angular.module('booksApp').controller('BookController', BookController);

function BookController($routeParams, BookDataFactory, $location, $route){
    let vm = this;
    let bookId = $routeParams.bookId
    BookDataFactory.getOneBook(bookId).then(response => vm.book = response)
    vm.deleteBook = function(bookId) {
        BookDataFactory.deleteOneBook(bookId).then(() => {
            console.log("success");
            $location.path("/");
        })
    }

    vm.back = function(){
        $location.path('/')
    }

    vm.updateBook = function(bookId) {
        if(vm.title && vm.price && vm.edition && vm.year && vm.rating && vm.author){
            const newBook = {
                title: vm.title,
                price: vm.price,
                rating: vm.rating,
                edition: vm.edition,
                year: vm.year,
                author: vm.author
            }

            BookDataFactory.replaceBook(bookId, newBook).then(() => $route.reload())
        } else {
            const newBook = {}
            if (vm.title) newBook.title = vm.title;
            if (vm.price) newBook.price = vm.price;
            if (vm.edition) newBook.edition = vm.edition;
            if (vm.year) newBook.year = vm.year;
            if (vm.rating) newBook.rating = vm.rating;
            if (vm.author) newBook.author.city = vm.author;

            BookDataFactory.updateBook(bookId, newBook).then(() => {
                $route.reload()
            })
        }
    }
}