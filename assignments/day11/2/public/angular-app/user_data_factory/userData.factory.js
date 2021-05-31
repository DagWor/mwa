angular.module('booksApp').factory('UserDataFactory', UserDataFactory);

function UserDataFactory($http) {
    return {
        registerUser: function (user){
            return $http.post('api/users/', user).then(complete).catch(failed)
        }
    }
}

function complete(response){
    return response.data;
}

function failed(error){
    return error.status.statusText;
}