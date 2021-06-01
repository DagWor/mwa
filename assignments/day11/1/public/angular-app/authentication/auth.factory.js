angular.module('meanGames').factory('AuthFactory', AuthFactory)

function AuthFactory($window) {
    if ($window.sessionStorage.token) auth = { isLoggedIn: true }
    else auth = { isLoggedIn: false }
    return {
        auth: auth
    };

}