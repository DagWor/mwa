angular.module('booksApp').controller('BookListController', BookListController);

function BookListController(BookDataFactory, $route, $routeParams) {
    let vm = this;
    vm.page = 'These are the Books'
    vm.next = true;
    if (!$routeParams.offset) vm.offset = 0;
    if (!$routeParams.count) vm.count = 5;
    BookDataFactory.getAllBooks().then(response => {
        
        console.log(response)
        vm.books = response
    });
    BookDataFactory.getAllAuthors().then(response => vm.authors = response);

    vm.searchBooks = function (author) {
        if(author == "") $route.reload()
        else BookDataFactory.getAllBooksByAuthor(author).then(res => vm.books = res)
    }
    vm.addBook = function () {
        const newBook = {
            title: vm.title,
            price: vm.price
        }
        
        if(vm.edition) newBook.edition = vm.edition
        if(vm.rating) newBook.rating = vm.rating
        if(vm.author) newBook.author = vm.author
        if(vm.year) newBook.year = vm.year

        BookDataFactory.addOneBook(newBook).then(() => {
            console.log("success")
            $route.reload()
        })
    }

    vm.nextPage = function () {
        vm.offset += 5;
        BookDataFactory.getAllBooks(vm.offset, vm.count).then(res => {
            vm.books = res;
            console.log(res)
            if (vm.books.length % 5 !== 0) vm.next = false
        })
    }

    vm.previousPage = function () {
        vm.offset -= 5;
        BookDataFactory.getAllBooks(vm.offset, vm.count).then(res => {
            vm.books = res
            vm.next = true
        })
    }
}