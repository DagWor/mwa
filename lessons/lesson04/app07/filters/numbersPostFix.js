angular.module("properApp").filter('order', numberOrder);

function numberOrder() {
    return function (number) {
        if (number && !isNaN(number)) {
            let digit = number % 10;
            let suffix = "";
            switch (digit) {
                case 1:
                    suffix = "st";
                    break;
                case 2:
                    suffix = "nd";
                    break;
                case 3:
                    suffix = "rd";
                    break;
                default:
                    suffix = 'th';
                    break;
            }
            return number + suffix;
        }
    }
}