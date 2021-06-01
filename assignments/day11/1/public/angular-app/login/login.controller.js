angular.module('meanGames').controller('LoginController', LoginController);

function LoginController($location, AuthFactory, UserDataFactory, $window, jwtHelper) {
    const vm = this;
    vm.loggedinUser = "Name"
    vm.isActiveTab = (url) => {
        const currentPath = $location.path().split("/")[1];
        if (url === currentPath ? "active" : "");
    };

    vm.isLoggedIn = () => { return AuthFactory.auth.isLoggedIn; }

    vm.login = () => {
        if (vm.username && vm.password) {
            const user = {
                username: vm.username,
                password: vm.password
            }
            UserDataFactory.login(user).then(res => {
                if (res.success) {
                    $window.sessionStorage.token = res.token
                    AuthFactory.auth.isLoggedIn = true

                    let token = $window.sessionStorage.token;
                    console.log(token)
                    let decodedToken = jwtHelper.decodeToken(token)

                    vm.loggedinUser = decodedToken.username
                    console.log(vm.loggedinUser)
                    vm.username = ";"
                    vm.password = ";"
                    $location.path('/')
                }
            }).catch(err => {
                console.log(err);
            })

        }
    }

    vm.logout = () => {
        AuthFactory.auth.isLoggedIn = false
        delete $window.sessionStorage.token;
        $location.path('/')
    }
}