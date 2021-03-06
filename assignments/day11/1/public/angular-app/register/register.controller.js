angular.module('meanGames').controller('RegisterController', RegisterController);

function RegisterController($http, $location) {
    const vm = this;
    vm.register = function () {
        const user = {
            name: vm.name,
            username: vm.username,
            password: vm.password
        }
        if (!vm.password && !vm.username) vm.err = "Please enter password and username"
        else if (vm.password !== vm.passwordRepeat) vm.err = "Passwords do not match"
        else $http.post('/api/users', user).then((res) => {
            console.log(res);
            vm.message = 'Successful registration, please login'
            $location.path('/books')
        }).catch((err) => console.log(err))
    }
}