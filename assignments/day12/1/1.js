function fibonnaci(number){
        if (number <= 2) return 1;
        else return fibonnaci(number - 1) + fibonnaci(number - 2);
}

const myPromise = (number) => Promise.resolve(fibonnaci(number));


myPromise(6).then(result => console.log(result));