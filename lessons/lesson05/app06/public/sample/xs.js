
angular.module('meanGames').controller('MyController', MyController);

function MyController() {
    const vm = this;
    vm.message = 'hello';
    vm.isSubmitted = false;
    vm.add = function () {
        console.log("Add function")
        if (vm.myForm.$valid) console.log("Add to database");
        else vm.isSubmitted = true;
    }
}