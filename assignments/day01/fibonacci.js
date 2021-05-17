function Fibonacci(number) {
    if (number <= 2) return 1; 
    else return Fibonacci(number - 1) + Fibonacci(number - 2)
}

module.exports = Fibonacci

/**
 * module.exports = {
 *      fibo: Fibonacci
 * }
 */