angular.module('booksApp', ['ngRoute', "angular-jwt"]).config(config).run(run)

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("")
    $routeProvider.when('/', {
        templateUrl: 'angular-app/welcome/welcome.html',
        access: { restricted: false }
    }).when('/books', {
        templateUrl: 'angular-app/books_list/books.html',
        controller: 'BookListController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/books/:bookId', {
        templateUrl: 'angular-app/book_one/book.html',
        controller: 'BookController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/login', {
        templateUrl: 'angular-app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/profile', {
        templateUrl: 'angular-app/profile/profile.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        access: { restricted: true }
    }).otherwise({
        redirectTo: "/"
    })
}

function run($rootScope, $location, AuthFactory, $window) {
    $rootScope.$on("$routeChangeStart", (event, nextRoute, currentRoute) => {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/')
        }
    })
}