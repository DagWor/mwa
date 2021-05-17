console.log("1: Start");

const lateWork = setTimeout(function () {
    console.log("2: Timeout");
}, 3000)

console.log("3: End");