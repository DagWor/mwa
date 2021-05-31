angular.module('booksApp').controller('RegisterController', RegisterController);

function RegisterController($http, UserDataFactory, $location) {
    const vm = this;
    vm.register = function() {
        const user = {
            name: vm.name,
            username: vm.username,
            password: vm.password
        }

        
        if(!vm.password && !vm.username) vm.err = "Please enter password and username"
        else if(vm.password !== vm.passwordRepeat) vm.err = "Passwords do not match"
        else UserDataFactory.registerUser(user).then(() => {
            vm.message = 'Successful registration, please login'
        })
    }
}