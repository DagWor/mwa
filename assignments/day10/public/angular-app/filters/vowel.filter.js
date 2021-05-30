angular.module('jobOpenings').filter('vowel', VowelRemoval);

function VowelRemoval() {
    return function (string, vowel) {
        vowels = ['a', 'e', 'i', 'o', 'u'];
        if (string && vowels.includes(vowel)) {
            let newString = "";
            for (let char of string) {
                if (vowels.includes(char)) {
                    continue;
                }
                newString += char;
            }
            return newString;
        }
        return string;

    }
}