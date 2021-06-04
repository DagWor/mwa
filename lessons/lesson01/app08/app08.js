const childProcess = require("child_process");
console.log("Start");
const newProcess = childProcess.spawn("node", ["computation/_fibonacci.js"], {stdio: "inherit"})

console.log("End");