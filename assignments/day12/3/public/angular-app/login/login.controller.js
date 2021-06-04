angular.module('booksApp').controller('LoginController', LoginController);

function LoginController($http, AuthFactory, $location, UserDataFactory, $window, jwtHelper) {
    const vm = this;
    vm.loggedInUser = "Name"
    vm.isLoggedIn = () => { return AuthFactory.auth.isLoggedIn; }

    vm.login = function () {
        const user = {
            username: vm.username,
            password: vm.password
        }


        if (!vm.password && !vm.username) vm.err = "Please enter password and username"
        else UserDataFactory.login(user).then(res => {
            if (res.success) {
                $window.sessionStorage.token = res.token

                let token = $window.sessionStorage.token;
                let decodedToken = jwtHelper.decodeToken(token);

                console.log(decodedToken.username);
                vm.loggedInUser = decodedToken.username;
                UserDataFactory.findUser(vm.loggedInUser).then(res => {
                    AuthFactory.auth.isLoggedIn = true
                    vm.username = "";
                    vm.password = "";
                    vm.user = res
                    console.log(vm.user);
                    AuthFactory.auth.isLoggedIn = true
                    $location.path("/")
                })

            }
        }).catch(() => {
            vm.err = 'wrong credentials'
        })
    }

    vm.logout = () => {
        AuthFactory.auth.isLoggedIn = false
        delete $window.sessionStorage.token;
        $location.path('/')
    }

    // vm.findUser = (username) => {
    //     return UserDataFactory.findUser(username).then(res => {
    //         return res
    //     })
    // }
}