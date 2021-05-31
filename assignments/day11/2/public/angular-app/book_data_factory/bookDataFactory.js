angular.module('booksApp').factory('BookDataFactory', BookDataFactory);

function BookDataFactory($http) {
    return {
        getAllBooks: function (offset, count){
            if(offset && count) return $http.get('/api/books?count='+count+'&offset='+offset).then(complete).catch(failed)
            else if(!offset && count) return $http.get('/api/books?count='+count).then(complete).catch(failed)
            else if(offset && !count) return $http.get('/api/books?offset='+offset).then(complete).catch(failed)
            else return $http.get('/api/books').then(complete).catch(failed)
        },
        getOneBook: function (bookId) {
            return $http.get(`/api/book/${bookId}`).then(complete).catch(failed)
        },
        addOneBook: function(book) {
            return $http.post('/api/books', book).then(complete).catch(failed)
        },
        getAllAuthors: function() {
            return $http.get('/api/authors').then(complete).catch(failed)
        },
        getAllBooksByAuthor: function(auth){
            let author = auth.replace(" ", "+")
            return $http.get('/api/books?author=' + author).then(complete).catch(failed);
        },
        deleteOneBook: function(bookId) {
            return $http.delete('/api/book/' + bookId).then(complete).catch(failed)
        },
        updateBook: function (bookId, book){
            return $http.patch('api/books/' + bookId, book).then(complete).catch(failed)
        },
        replaceBook: function (bookId, book){
            return $http.put('api/books/' + bookId, book).then(complete).catch(failed)
        }
    }
}

function complete(response){
    return response.data;
}

function failed(error){
    return error.status.statusText;
}