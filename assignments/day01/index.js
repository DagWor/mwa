const childProcess = require("child_process");


console.log("1");

const newProcess = childProcess.spawn(
    "node",
    ["service/fibonacci.js"],
    {
        stdio: 'inherit'
    }
)
console.log("3");