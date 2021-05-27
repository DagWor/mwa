angular.module('booksApp').factory('BookDataFactory', BookDataFactory);

function BookDataFactory($http) {
    return {
        getAllBooks: function getAllBooks() {
            return $http.get('/api/books').then(complete).catch(failed)
        },
        getOneBook: function getOneBook(bookId) {
            return $http.get(`/api/book/${bookId}`).then(complete).catch(failed)
        },
        addOneBook: function(book) {
            return $http.post('/api/books', book).then(complete).catch(failed)
        },
        deleteOneBook: function(bookId) {
            return $http.delete('/api/book/' + bookId).then(complete).catch(failed)
        }
    }
}

function complete(response){
    return response.data;
}

function failed(error){
    return error.status.statusText;
}