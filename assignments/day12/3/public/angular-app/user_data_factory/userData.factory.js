angular.module('booksApp').factory('UserDataFactory', UserDataFactory);

function UserDataFactory($http) {
    return {
        registerUser: function (user){
            return $http.post('api/users/', user).then(complete).catch(failed)
        },
        login: function(user){
            return $http.post('/api/auth', user).then(complete).catch(failed)
        },
        findUser: function(username) {
            return $http.get('/api/users/' + username).then(complete).catch(failed)
        }
    }
}

function complete(response){
    return response.data;
}

function failed(error){
    return error.status.statusText;
}