function Fibonacci(number) {
    if (number <= 2) return 1; 
    else return Fibonacci(number - 1) + Fibonacci(number - 2)
}

console.log(Fibonacci(36))