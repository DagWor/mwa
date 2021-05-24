angular.module("apiApp").controller("ApiController", ApiController)

function ApiController($http) {
    let vm = this;
    $http.get("https://api.publicapis.org/entries?category=book&https=true").then(function (response) {
        vm.apis = response.data.entries;
    });
}